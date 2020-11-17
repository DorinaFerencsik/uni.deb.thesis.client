import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { ILoginPayload, ILoginResponse } from 'src/utils/payloads/auth';
import { IAccessToken } from 'utils/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {

  private readonly apiUrl = 'authApi';

  constructor(private httpClient: CustomHttpClient) { }

  public authenticate(request: ILoginPayload): Observable<ILoginResponse> {
    return this.httpClient.post(this.apiUrl, 'auth', request);
  }

  public refreshAccessToken(refreshToken: string): Observable<IAccessToken> {
    return this.httpClient.post(this.apiUrl, 'auth/refresh', { refreshToken });
  }

  public getUserInfo(): Observable<{ firstName: string, lastName: string }> {
    return this.httpClient.get(this.apiUrl, 'auth');
  }
}
