import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiFileService } from 'src/app/diagram/services/api-file.service';
import { Roles } from 'utils/enums/user';
import { IDiagramType } from 'utils/interfaces/diagram';
import { IDataSource } from 'utils/interfaces/diagram/data-source.interface';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-create-diagram',
  templateUrl: './create-diagram.component.html',
  styleUrls: ['./create-diagram.component.scss'],
})
export class CreateDiagramComponent {

  public roles = Roles;
  public diagramType: IDiagramType;
  public exampleFile: {
    data: any[],
    columns: string[],
  };
  public selectedFile: {data: any, columns: any};

  public exampleDatasets$: Observable<IDatasets[]>;

  public imageSrc;
  public source: string;

  private readonly typeId: string;
  private selectedDataSource: IDataSource;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiDiagramService,
    private apiFileService: ApiFileService,
    private sanitizer: DomSanitizer
  ) {
    this.typeId = this.route.snapshot.queryParams.type;
    this.apiService.getDiagramTypeById(this.typeId)
      .pipe(
        first(),
        switchMap((diagramType) => {
          this.diagramType = diagramType;
          return this.diagramType.data
            ? this.apiFileService.readExampleDataset(this.diagramType.data.source, this.diagramType.data.name)
            : of(null);
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
    this.selectedDataSource = {
      source: event.source,
      name: event.name,
    };
    this.apiFileService.readExampleDataset(event.source, event.name).pipe(
      first(),
      tap(fileContent => {
        this.selectedFile = null;
        this.selectedFile = {
          data: fileContent,
          columns: Object.keys(fileContent[0]),
        };
      })
    ).subscribe();
  }

  onFileSelected(filename: string) {
    // this.selectedDataSource = {
    //   source: event.source,
    //   name: event.name,
    // };
    this.apiFileService.readExampleFile(filename).pipe(
      first(),
      tap(fileContent =>
        this.selectedFile = {
          data: fileContent,
          columns: Object.keys(fileContent[0]),
        })
    ).subscribe();
  }

  onSubmit(event) {
    const request = {
      typeId: this.typeId,
      data: this.selectedDataSource,
      params: event,
      format: 'png',
    };
    console.log('generating diagram with: ', request);
    this.apiService.generateDiagram({
      typeId: this.typeId,
      data: this.selectedDataSource,
      params: event,
      format: 'png',
    }).subscribe(res => {
      console.log('response', res);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(res.result);
      this.source = res.source;
    });
  }

  public onLogin() {
    this.authService.login().subscribe();
  }

  public onRegister() {
    this.authService.register();
  }
}
