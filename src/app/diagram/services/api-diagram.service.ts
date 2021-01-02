import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { IDiagram } from 'utils/interfaces/diagram';
import { IBasicDiagram } from 'utils/interfaces/diagram/basic-diagram.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiDiagramService {
  private apiUrl = 'diagramApi';

  constructor(private httpClient: CustomHttpClient) { }

  public getDiagramTypeList(request: any): Observable<IBasicDiagram[]> {
    return this.httpClient.get(this.apiUrl, 'diagram/type/list');
  }

  public getDiagramTypeById(id: string): Observable<IDiagram> {
    return this.httpClient.get(this.apiUrl, `diagram/type/${id}`);
  }

}
