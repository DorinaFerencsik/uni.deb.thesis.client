import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { IDiagramType, IUserDiagram } from 'utils/interfaces/diagram';
import { IBasicDiagram } from 'utils/interfaces/diagram/basic-diagram.interface';
import { IGenerateDiagramPayload, IGenerateDiagramResponse } from 'utils/payloads/diagram';

@Injectable({
  providedIn: 'root',
})
export class ApiDiagramService {
  private apiUrl = 'diagramApi';

  constructor(private httpClient: CustomHttpClient) { }

  public getUserDiagramList() {
    return this.httpClient.get(this.apiUrl, 'diagram');
  }

  public getUserDiagramById(diagramId: string) {
    return this.httpClient.get(this.apiUrl, `diagram/${diagramId}`);
  }

  public createUserDiagram(request: IUserDiagram): Observable<{id: string}> {
    return this.httpClient.post(this.apiUrl, 'diagram', request);
  }

  public getDiagramTypeList(request: {params?: any}): Observable<IBasicDiagram[]> {
    return this.httpClient.post(this.apiUrl, 'diagram/type', request);
  }

  public getDiagramTypeById(id: string): Observable<IDiagramType> {
    return this.httpClient.get(this.apiUrl, `diagram/type/${id}`);
  }

  public getTagList(): Observable<string[]> {
    return this.httpClient.get(this.apiUrl, 'diagram/tag/list');
  }

  public generateDiagram(request: IGenerateDiagramPayload): Observable<IGenerateDiagramResponse> {
    return this.httpClient.post(this.apiUrl, 'diagram/generate', request);
  }

  public createDiagramType(request: Partial<IDiagramType>): Observable<any> {
    return this.httpClient.post(this.apiUrl, 'diagram/admin', request);
  }

}
