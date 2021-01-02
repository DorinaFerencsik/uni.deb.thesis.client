import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent {

  @Input() paddingTop = '8px';
  @Input() paddingBottom = '8px';

}
