import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileOwner } from 'src/app/shared/enums/file-owner.enum';
import { Roles } from 'utils/enums/user';

import { ApiFileService } from '../../services/api-file.service';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.scss'],
})
export class UserFilesComponent implements OnInit {

  public readonly roles = Roles;
  public files$: Observable<any>;

  public exampleDatasets$: Observable<any>;
  public exampleFiles$: Observable<any>;

  constructor(
    private apiService: ApiFileService,
    private persmissionService: NgxPermissionsService,
    private snackBar: MatSnackBar
  ) {
    if (this.persmissionService.hasPermission(Roles.Admin)) {
      this.exampleDatasets$ = this.apiService.listExampleDatasets();
      this.exampleFiles$ = this.apiService.listExampleFiles();
    }
  }

  ngOnInit(): void {
    this.refreshFileList();
  }

  public refreshFileList() {
    this.files$ = this.apiService.listUserFiles().pipe(tap(res => console.log(res)));
  }

  public analyzeFile(event: {owner: FileOwner, name: string, source?: string}) {
    this.apiService.analyze(event.owner, event.name, event.source).subscribe(res => {
      this.snackBar.open('Statistics generated', '', {
        duration: 2000,
      });
    });
  }
}
