import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  public file: NgxFileDropEntry = null;

  @Output() fileUploaded = new EventEmitter();

  constructor(
    private service: FileService,
    private apiService: ApiFileService
  ) { }

  ngOnInit(): void {
  }

  public uploadFile() {
    if (this.file.fileEntry.isFile) {
      const fileEntry = this.file.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        // Access the real file
        console.log(this.file.relativePath, file);

        this.apiService.uploadFileAsFormData(file, this.file.relativePath)
        .subscribe(data => {
          console.log('response:', data);
          this.fileUploaded.emit();
          this.file = null;
        });

      });
    } else {
      // It was a directory (empty directories are added, otherwise only files)
      const fileEntry = this.file.fileEntry as FileSystemDirectoryEntry;
      console.log(this.file.relativePath, fileEntry);
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.file = files[0];
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
