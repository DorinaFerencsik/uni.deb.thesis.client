import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { IUserDiagram } from 'utils/interfaces/diagram';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-diagram-list',
  templateUrl: './diagram-list.component.html',
  styleUrls: ['./diagram-list.component.scss'],
})
export class DiagramListComponent implements OnInit {

  public diagrams: IUserDiagram[] = [];
  public readonly trackById = (index: number, item: any) => item._id;

  constructor(
    private apiService: ApiDiagramService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.filter();
  }

  public navigateToDetails(id) {
    this.router.navigate([`/app/diagram/${id}`]);
  }

  private filter() {
    this.apiService.getUserDiagramList('').pipe(
      first(),
      tap(diagrams => this.diagrams = diagrams)
    ).subscribe();
  }
}
