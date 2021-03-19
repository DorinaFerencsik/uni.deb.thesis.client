import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiFileService } from '../../services/api-file.service';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.scss'],
})
export class UserFilesComponent implements OnInit {

  public files$: Observable<any>;

  constructor(
    private apiService: ApiFileService
  ) { }

  ngOnInit(): void {
    this.files$ = this.apiService.listUserFiles().pipe(tap(res => console.log(res)));
  }

}
