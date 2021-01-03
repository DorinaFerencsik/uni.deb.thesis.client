import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {

  public readonly columns = ['name', 'createdAt', 'size'];

  @Input() dataSource: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
