import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';


@Injectable({
  providedIn: 'root',
})
export class ApiLandingService {

  constructor(private httpClient: CustomHttpClient) {
    this.httpClient.apiUrl = 'diagramApi';
  }

  public getBasic(): Observable<any> {
    return this.httpClient.get('');
  }

}
