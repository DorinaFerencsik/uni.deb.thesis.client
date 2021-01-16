import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipList } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { IBasicDiagram } from 'utils/interfaces/diagram/basic-diagram.interface';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss'],
})
export class ExampleListComponent implements OnInit {

  public diagrams$: Observable<IBasicDiagram[]>;
  public diagrams: IBasicDiagram[] = [];

  @ViewChild('chipList')
  chipList: MatChipList;

  public tags: {name: string, selected: boolean}[] = [];

  public readonly trackById = (index: number, item: any) => item._id;

  constructor(private apiService: ApiDiagramService) {
    this.apiService.getTagList().pipe(
      first(),
      tap(tags => this.tags = tags.map(tag => ({name: tag, selected: false}))
    )).subscribe();
  }

  ngOnInit(): void {
    this.filter();
  }

  onTagSelected($event) {
    this.tags[this.tags.findIndex(t => t.name = $event)].selected = true;
  }

  changeSelected($event): void {
    this.filter();
  }

  private filter() {
    this.apiService.getDiagramTypeList({
      params: { tags: this.tags.filter(f => f.selected).map(f => f.name)},
    }).pipe(
      first(),
      tap(diagrams => this.diagrams = diagrams)
    ).subscribe();
  }
}
