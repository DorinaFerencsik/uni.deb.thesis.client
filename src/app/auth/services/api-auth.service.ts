import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { ILoginPayload, ILoginResponse } from 'src/utils/payloads/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {

  private readonly apiUrl = 'authApi';

  constructor(private httpClient: CustomHttpClient) { }

  public authenticate(request: ILoginPayload): Observable<ILoginResponse> {
    return this.httpClient.post(this.apiUrl, 'auth', request);
  }
}
