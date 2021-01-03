import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss'],
})
export class FileContentComponent {

  @Input() value: {
    data: any[],
    columns: string[],
  };

  constructor() { }

}
