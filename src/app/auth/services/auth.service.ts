import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ILoginPayload } from 'src/utils/payloads/auth';

import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiAuthService,
    private dialog: MatDialog
  ) { }


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
  }

  public getUser(): BehaviorSubject<any> {
    return this.user$;
  }

  public getUserDetail(): any {
    return this.user$.getValue();
  }

  private authenticate(credentials: ILoginPayload) {
    return this.apiService.authenticate(credentials).pipe(
      tap(response => {
        this.user$.next(response.user);
        this.updateTokens(response.accessToken, response.refreshToken);
      }),
      map(() => of(null))
    );
  }

  private updateTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

}
