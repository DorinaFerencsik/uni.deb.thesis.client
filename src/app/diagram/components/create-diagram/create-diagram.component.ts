import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ApiFileService } from 'src/app/file/services/api-file.service';
import { IDiagram } from 'utils/interfaces/diagram';

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

  public exampleFileList$: Observable<any>;

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
    this.exampleFileList$ = this.apiFileService.listExampleFiles();
  }

}
