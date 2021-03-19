import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Base64 } from 'js-base64';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Errors } from 'src/utils/enums/common';
import { IBasicUser } from 'src/utils/interfaces/user';
import { ILoginPayload, ITokenPayload } from 'src/utils/payloads/auth';
import { Roles } from 'utils/enums/user';

import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  private user$ = new BehaviorSubject<IBasicUser>(null);
  private tokenPayload: ITokenPayload;

  constructor(
    private apiService: ApiAuthService,
    private permissionsService: NgxPermissionsService,
    private dialog: MatDialog
  ) {
    this.restoreSession();
  }


  // TODO handle errors
  public login(): Observable<any> {
    return this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .pipe(
        switchMap(cred => cred ? this.authenticate(cred) : of(null))
      );
  }

  public logout() {
    this.user$.next(null);
    this.permissionsService.flushPermissions();
    this.permissionsService.loadPermissions([Roles.Guest]);
    console.log('Current permissions: ', this.permissionsService.getPermissions());
    this.deleteTokens();
  }

  public register() {
    console.log('Should register');
  }

  public refreshAccessToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return of(null);
    }
    console.log('Trying to refresh');
    return this.apiService.refreshAccessToken(refreshToken)
      .pipe(
        // FIXME catch error
        tap((response) => {
          console.log('refresh response: ', response);
          return this.loadUser().subscribe();
        }),
        catchError(err => {
          console.log('err: ', err);
          this.logout();
          if (err.error.message === Errors.TokenExpired) {
            console.error('refresh token expired!');
          }
          return of(null);
        })
      );
  }

  public getUser(): BehaviorSubject<IBasicUser> {
    return this.user$;
  }

  public getUserDetail(): any {
    return this.user$.getValue();
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private authenticate(credentials: ILoginPayload) {
    return this.apiService.authenticate(credentials).pipe(
      tap(response => {
        this.updateTokens(response.accessToken, response.refreshToken);
        this.updateUser(response.firstName, response.lastName);
      }),
      map(() => of(null))
    );
  }

  private restoreSession() {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return this.logout();
    }
    this.decodeTokenPayload(accessToken);
    if (this.isSessionTokenExpired()) {
      this.refreshAccessToken().subscribe();
    } else {
      this.loadUser().subscribe();
    }
  }

  private loadUser(): Observable<null> {
    return this.apiService.getUserInfo().pipe(
      map((userInfo) => {
        this.updateUser(userInfo.firstName, userInfo.lastName);
        return null;
      })
    );
  }

  private updateUser(firstName: string, lastName: string) {
    this.user$.next({
      firstName,
      lastName,
      roles: this.tokenPayload.roles,
      email: this.tokenPayload.email,
    });
    this.permissionsService.loadPermissions(this.tokenPayload.roles);
  }

  private updateTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
    this.decodeTokenPayload(accessToken);
  }

  private deleteTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private decodeTokenPayload(token: string) {
    const url = token.split('.')[1];
    this.tokenPayload = JSON.parse(Base64.decode(url));
  }

  private isSessionTokenExpired() {
    return !this.tokenPayload || 10 > this.tokenPayload.exp - Math.floor(Date.now() / 1000);
  }

}
