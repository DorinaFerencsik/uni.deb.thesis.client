import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { keys as _keys } from 'lodash';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/core/services/custom-http-client.service';
import { DiagramTypeEnum } from 'src/utils/enums/diagram/diagram-types.enum';
import { IGenerateDiagramPayload, IGenerateDiagramResponse } from 'src/utils/payloads/diagram';

@Injectable({
  providedIn: 'root',
})
export class ApiLandingService {

  private apiUrl = 'diagramApi';

  private defaulGeneratePayload: IGenerateDiagramPayload = {
    typeId: DiagramTypeEnum.example,
    data: {source: 'example', name: 'file name.csv'},
    params: [{
      csvSeparator: '|',
    }, {
      axisX: 'total_bill',
    }, {
      axisY: 'tip',
    }],
    format: 'svg',
  };

  constructor(private httpClient: CustomHttpClient) { }

  public getBasic(): Observable<any> {
    return this.httpClient.get(this.apiUrl, 'diagram');
  }

  public generate(request?: Partial<IGenerateDiagramPayload>): Observable<IGenerateDiagramResponse> {
    let params = new HttpParams();
    _keys(this.defaulGeneratePayload).forEach(key =>
      params = params.append(key, request && request[key] ? request[key] : this.defaulGeneratePayload[key])
    );
    // return this.httpClient.get(this.apiUrl, 'diagram/generate', {params});
    return this.httpClient.post(this.apiUrl, 'diagram/generate', request);
  }

}
