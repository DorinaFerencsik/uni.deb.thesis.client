import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  api?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClient {
  // tslint:disable-next-line: variable-name
  private _apiUrl: string;
  public set apiUrl(value) {
    if (environment[value]) {
      this._apiUrl = environment[value];
    } else {
      throw new Error('Api is not present in environment');
    }
  }
  public get apiUrl() {
    return this._apiUrl;
  }

  constructor(private http: HttpClient) {}

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.apiUrl + endPoint, options);
  }

  public post<T>(endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(this.apiUrl + endPoint, params, options);
  }

  public put<T>(endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(this.apiUrl + endPoint, params, options);
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.apiUrl + endPoint, options);
  }
}

export function customHttpClientCreator(http: HttpClient) {
  return new CustomHttpClient(http);
}
