import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';


@Injectable({
  providedIn: 'root',
})
export class ApiLandingService {

  private apiUrl = 'diagramApi';

  constructor(private httpClient: CustomHttpClient) { }

  public getBasic(): Observable<any> {
    return this.httpClient.get(this.apiUrl, '');
  }

}
