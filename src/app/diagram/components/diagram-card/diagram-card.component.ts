import { Component, Input } from '@angular/core';
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
  @Input() params: IDiagramParam[] = [];
  @Input() order: string;

  constructor(public router: Router) { }

  public createFromType() {
    this.router.navigate(['/diagram/create'], { queryParams: { type: this.id } });
  }

}
