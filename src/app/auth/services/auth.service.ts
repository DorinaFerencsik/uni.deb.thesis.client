import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiAuthService) { }


  public login(): Observable<any> {
    const id = Math.floor(Math.random() * (10 - 1) + 2);
    return this.apiService
      .getUser(id)
      .pipe(
        tap(user => this.user$.next(user)
      )
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

}
