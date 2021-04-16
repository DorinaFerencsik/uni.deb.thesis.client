import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { FileOwner } from 'src/app/shared/enums/file-owner.enum';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';
import { IReadFileResponse } from 'utils/payloads/file/read-file.interface';
import { IFileStat } from 'utils/payloads/file/stat.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiFileService {
  private apiUrl = 'diagramApi';

  constructor(private httpClient: CustomHttpClient) { }


  public listUserFiles(): Observable<any> {
    return this.httpClient.get(this.apiUrl, 'file/list');
  }

  public listExampleFiles(): Observable<any> {
    return this.httpClient.get(this.apiUrl, 'file/example/list');
  }

  public listExampleDatasets(): Observable<IDatasets[]> {
    return this.httpClient.get(this.apiUrl, 'file/example/dataset/list');
  }

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

  public readData(fileOwner: string, name: string, source: string = null, rows: number = 5, page: number = 0) {
    if (fileOwner === FileOwner.User) {
      return this.readUserFile(name, rows, page);
    }
    if (source && source !== FileOwner.Example) {
      return this.readExampleDataset(source, name, rows, page);
    }
    return this.readExampleFile(name, rows, page);
  }

  public readStat(fileOwner: string, name: string, source: string = null): Observable<any> {
    if (fileOwner === FileOwner.User) {
      return this.readUserFileStat(name);
    }
    if (source && source !== FileOwner.Example) {
      return this.readExampleDatasetStat(source, name);
    }
    return this.readExampleFileStat(name);
  }

  public analyze(fileOwner: string, name: string, source: string = null): Observable<any> {
    if (fileOwner === FileOwner.User) {
      return this.analyzeUserFile(name);
    }
    if (source && source !== FileOwner.Example) {
      return this.analyzeExampleDataset(source, name);
    }
    return this.analyzeExampleFile(name);
  }

  /**
   * User file handling
   */
  private readUserFile(filename: string, rows: number = 5, page: number = 0): Observable<IReadFileResponse> {
    const params = new HttpParams()
      .append('filename', filename)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file', { params });
  }

  private readUserFileStat(filename: string): Observable<IFileStat> {
    const params = new HttpParams()
      .append('filename', filename);
    return this.httpClient.get(this.apiUrl, 'file/stat', { params });
  }

  private analyzeUserFile(name: string) {
    return this.httpClient.post(this.apiUrl, 'file/analyze', { name });
  }

  /**
   * Example files
   */
  private readExampleFile(filename: string, rows: number = 5, page: number = 0): Observable<IReadFileResponse> {
    const params = new HttpParams()
      .append('filename', filename)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file/example', { params });
  }

  private readExampleFileStat(filename: string) {
    const params = new HttpParams()
      .append('filename', filename);
    return this.httpClient.get(this.apiUrl, 'file/example/stat', { params });
  }

  private analyzeExampleFile(name: string) {
    return this.httpClient.post(this.apiUrl, 'file/example/analyze', { name });
  }


  /**
   * Example datasets (built-in, e.g. seaborn )
   */
  private readExampleDataset(source, datasetName, rows: number = 5, page: number = 0): Observable<IReadFileResponse> {
    const params = new HttpParams()
      .append('source', source)
      .append('name', datasetName)
      .append('rows', String(rows))
      .append('page', String(page));
    return this.httpClient.get(this.apiUrl, 'file/example/dataset', { params });
  }

  private readExampleDatasetStat(source: string, datasetName: string) {
    const params = new HttpParams()
      .append('source', source)
      .append('name', datasetName);
    return this.httpClient.get(this.apiUrl, 'file/example/dataset/stat', { params });
  }

  private analyzeExampleDataset(source: string, datasetName: string) {
    return this.httpClient.post(this.apiUrl, 'file/example/dataset/analyze', { name: datasetName, source });
  }
}
