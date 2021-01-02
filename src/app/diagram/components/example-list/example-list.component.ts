import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasicDiagram } from 'utils/interfaces/diagram/basic-diagram.interface';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss'],
})
export class ExampleListComponent implements OnInit {

  public diagrams$: Observable<IBasicDiagram[]>;

  constructor(private apiService: ApiDiagramService) {
    this.diagrams$ = this.apiService.getDiagramTypeList({});
  }

  ngOnInit(): void {
  }

}
