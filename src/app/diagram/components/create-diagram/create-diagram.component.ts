import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { keys as _keys } from 'lodash';
import { Observable, of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiFileService } from 'src/app/diagram/services/api-file.service';
import { NameDialogComponent } from 'src/app/shared/components/name-dialog/name-dialog.component';
import { FileOwner } from 'src/app/shared/enums/file-owner.enum';
import { environment } from 'src/environments/environment';
import { Roles } from 'utils/enums/user';
import { IDiagramType } from 'utils/interfaces/diagram';
import { IDataSource } from 'utils/interfaces/diagram/data-source.interface';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';
import { IGenerateDiagramPayload } from 'utils/payloads/diagram';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-create-diagram',
  templateUrl: './create-diagram.component.html',
  styleUrls: ['./create-diagram.component.scss'],
})
export class CreateDiagramComponent {

  public readonly roles = Roles;
  public diagramType: IDiagramType;
  public exampleFile: {
    data: any[],
    columns: string[],
  };
  public imgUrl = null;
  public selectedFile: {data: any, columns: any};

  public exampleDatasets$: Observable<IDatasets[]>;
  public exampleFiles$: Observable<IDatasets>;
  public userFiles$: Observable<any>;

  public imageSrc;
  public source: string;
  public excludeNull = false;

  private readonly typeId: string;
  private selectedDataSource: IDataSource;

  private diagramParams: IGenerateDiagramPayload = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiDiagramService,
    private apiFileService: ApiFileService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.typeId = this.route.snapshot.queryParams.type;
    this.imgUrl = `${environment.diagramApi}file/img/${this.typeId}`;
    this.apiService.getDiagramTypeById(this.typeId)
      .pipe(
        first(),
        switchMap((diagramType) => {
          this.diagramType = diagramType;
          return this.diagramType.data
            ? this.apiFileService.readData(FileOwner.Example, this.diagramType.data.name, this.diagramType.data.source)
            : of(null);
        })
      ).subscribe((fileContent) => {
        if (fileContent) {
          this.exampleFile = {
            data: fileContent.content,
            columns: Object.keys(fileContent.content[0]),
          };
        }
      });
    this.exampleDatasets$ = this.apiFileService.listExampleDatasets();
    this.exampleFiles$ = this.apiFileService.listExampleFiles();

    if (this.authService.isLoggedIn()) {
      this.refreshUserFileList();
    }
  }
  public refreshUserFileList() {
    this.userFiles$ = this.apiFileService.listUserFiles().pipe(tap(res => console.log(res)));
  }

  onDatasetSelected(event) {
    this.selectedDataSource = {
      source: event.source,
      name: event.name,
    };
    this.apiFileService.readData(FileOwner.Example, event.name, event.source).pipe(
      first(),
      tap(fileContent => {
        console.log('setting selectedFile to null');
        this.selectedFile = null;
        this.selectedFile = {
          data: fileContent.content,
          columns: Object.keys(fileContent.content[0]),
        };
      })
    ).subscribe();
  }

  onExampleFileSelected(event) {
    this.selectedDataSource = {
      source: event.source,
      name: event.name,
    };
    this.apiFileService.readData(FileOwner.Example, event.name).pipe(
      first(),
      tap(fileContent => {
        console.log('setting selectedFile to null');
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
    this.apiFileService.readData(FileOwner.User, filename).pipe(
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
      excludeNull: this.excludeNull,
    }).subscribe(res => {
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(res.result);
      this.source = res.source;
      this.diagramParams = res.settings;
    });
  }

  public saveDiagram() {
    this.dialog.open(NameDialogComponent, {
      data: {title: 'What should be the name of this diagram?', label: 'Diagram name'},
    }).afterClosed().subscribe(data => {
      if (data) {
        this.apiService.createUserDiagram({
          name: data.name,
          diagramTypeId: this.typeId,
          data: this.diagramParams.data,
          params: _keys(this.diagramParams.params).map(k => ({name: k, value: this.diagramParams.params[k]})),
          sourceCode: Base64.btoa(this.source),
        }).subscribe(res => {
          console.log('Diagram saved by id', res);
        });
      }
    });
  }

  public onLogin() {
    this.authService.login().subscribe();
  }

  public onRegister() {
    this.authService.register();
  }
}
