import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IDiagramParam } from 'utils/interfaces/diagram';

@Component({
  selector: 'app-diagram-card',
  templateUrl: './diagram-card.component.html',
  styleUrls: ['./diagram-card.component.scss'],
})
export class DiagramCardComponent {

  @Input() id: string;
  @Input() name: string;
  @Input() desc: string;
  @Input() image: string;
  @Input() tags: string[];
  @Input() filename: string;
  @Input() params: IDiagramParam[] = [];
  @Input() order: string;

  @Output() tagSelected = new EventEmitter();

  constructor(public router: Router) { }

  public createFromType() {
    this.router.navigate(['/diagram/create'], { queryParams: { type: this.id } });
  }

}
