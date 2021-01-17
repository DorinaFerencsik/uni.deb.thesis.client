import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { ApiFileService } from 'src/app/file/services/api-file.service';
import { IDiagram } from 'utils/interfaces/diagram';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-create-diagram',
  templateUrl: './create-diagram.component.html',
  styleUrls: ['./create-diagram.component.scss'],
})
export class CreateDiagramComponent {

  public diagramType: IDiagram;
  public exampleFile: {
    data: any[],
    columns: string[],
  };
  public selectedFile: {data: any, columns: any};

  public exampleDatasets$: Observable<IDatasets[]>;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiDiagramService,
    private apiFileService: ApiFileService
  ) {
    const typeId = this.route.snapshot.queryParams.type;
    this.apiService.getDiagramTypeById(typeId)
      .pipe(
        first(),
        switchMap((diagramType) => {
          this.diagramType = diagramType;
          return this.diagramType.filename ? this.apiFileService.readExampleFile(this.diagramType.filename) : of(null);
        })
      ).subscribe((fileContent) => {
        if (fileContent) {
          this.exampleFile = {
            data: fileContent,
            columns: Object.keys(fileContent[0]),
          };
        }
      });
    this.exampleDatasets$ = this.apiFileService.listExampleDatasets();
  }

  onDatasetSelected(event) {
    this.apiFileService.readExampleDataset(event.source, event.name).pipe(
      first(),
      tap(fileContent =>
        this.selectedFile = {
          data: fileContent,
          columns: Object.keys(fileContent[0]),
        })
    ).subscribe();
  }

  onFileSelected(filename: string) {
    this.apiFileService.readExampleFile(filename).pipe(
      first(),
      tap(fileContent =>
        this.selectedFile = {
          data: fileContent,
          columns: Object.keys(fileContent[0]),
        })
    ).subscribe();
  }

}
