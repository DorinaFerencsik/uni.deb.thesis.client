import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiFileService {
  private apiUrl = 'diagramApi';

  constructor(private httpClient: CustomHttpClient) { }

  public uploadFile(request: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, 'file', request);
  }

  public uploadFileAsFormData(file: File, relativePath) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', relativePath);
    formData.append('mimeType', file.type);

    return this.httpClient.post(this.apiUrl, 'file',  formData);
  }

  public readFile(filename: string, rows: number = 5, page: number = 0): Observable<any> {
    const params = new HttpParams()
      .append('filename', filename)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file', { params });
  }

  public readExampleFile(filename: string, rows: number = 5, page: number = 0): Observable<any> {
    const params = new HttpParams()
      .append('filename', filename)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file/example', { params });
  }

  public listUserFiles(): Observable<any> {
    return this.httpClient.get(this.apiUrl, 'file/list');
  }

  public listExampleFiles(): Observable<any> {
    return this.httpClient.get(this.apiUrl, 'file/example/list');
  }

  public listExampleDatasets(): Observable<IDatasets[]> {
    return this.httpClient.get(this.apiUrl, 'file/example/dataset/list');
  }

  public readExampleDataset(source, datasetName, rows: number = 5, page: number = 0): Observable<any> {
    const params = new HttpParams()
      .append('source', source)
      .append('name', datasetName)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file/example/dataset', { params });
  }
}
