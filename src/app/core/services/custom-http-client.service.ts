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

  constructor(private http: HttpClient) {}

  public get<T>(apiUrl: string, endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = environment[apiUrl];
    return this.http.get<T>(api + endPoint, options);
  }

  public post<T>(apiUrl: string, endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    const api = environment[apiUrl];
    return this.http.post<T>(api + endPoint, params, options);
  }

  public put<T>(apiUrl: string, endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    const api = environment[apiUrl];
    return this.http.put<T>(api + endPoint, params, options);
  }

  public delete<T>(apiUrl: string, endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = environment[apiUrl];
    return this.http.delete<T>(api + endPoint, options);
  }
}

export function customHttpClientCreator(http: HttpClient) {
  return new CustomHttpClient(http);
}
