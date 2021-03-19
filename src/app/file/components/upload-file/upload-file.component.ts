import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { switchMap } from 'rxjs/operators';

import { ApiFileService } from '../../services/api-file.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];

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

  public uploadFiles() {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Check if it's a file
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Access the real file
          console.log(droppedFile.relativePath, file);

          this.apiService.uploadFileAsFormData(file, droppedFile.relativePath)
          .subscribe(data => {
            console.log('response:', data);
          });

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
