import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { IDatasetInfo } from 'utils/interfaces/diagram/dataset-info.interface';
import { IDatasets } from 'utils/interfaces/diagram/dataset-list.interface';

import { FileOwner } from '../../enums/file-owner.enum';
import { DatasetPreviewDialogComponent } from '../dataset-preview-dialog/dataset-preview-dialog.component';

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {

  @Input() dataSource: IDatasets;
  @Output() datasetSelected = new EventEmitter();

  @ViewChild('panel') panel: MatExpansionPanel;

  public readonly columns = ['name', 'columns', 'rows', 'action'];
  public paginationParams: any;
  public paginated: IDatasetInfo[];

  constructor(private dialog: MatDialog) {
    this.paginationParams = {
      rows: 5,
      page: 0,
    };
  }

  ngOnInit(): void {
    this.paginationParams.totalRows = this.dataSource.datasets.length;
    this.paginateList();
  }

  public onPageChange(event) {
    this.paginationParams.page = event.pageIndex;
    this.paginationParams.rows = event.pageSize;
    this.paginateList();
  }

  previewDataset(datasetName: string) {
    this.dialog.open(DatasetPreviewDialogComponent, {
      data: { fileOwner: FileOwner.Example, name: datasetName, source: this.dataSource.source },
    });
  }

  public selectDataset(datasetName) {
    this.panel.close();
    this.datasetSelected.emit({
      name: datasetName,
      source: this.dataSource.source,
    });
  }

  private paginateList() {
    const page = this.paginationParams.page;
    this.paginated = this.dataSource.datasets.slice(
      page * this.paginationParams.rows,
      page * this.paginationParams.rows + this.paginationParams.rows
    );
  }

}
