import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {

  public readonly columns = ['name', 'createdAt', 'size', 'action'];

  @Input() dataSource: any[];

  @Output() fileSelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
