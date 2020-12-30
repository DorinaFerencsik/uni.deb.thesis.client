import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { ApiFileService } from '../../services/api-file.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  constructor(
    private service: FileService,
    private apiService: ApiFileService
  ) { }

  ngOnInit(): void {
    this.apiService.readFile('testFile.csv').subscribe();
  }

  public uploadFile(event) {
    this.service.readFile(event, {filename: 'testFile.csv'})
      .pipe(
        switchMap((payload) => {
          return this.apiService.uploadFile(payload);
        })
      ).subscribe();
  }
}
