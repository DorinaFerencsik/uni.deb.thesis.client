import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {

  constructor(private httpClient: CustomHttpClient) {}

  public getUser(userId: number): Observable<any> {
    return this.httpClient.get(`users/${userId}`);
  }
}
