import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from '../../../interfaces/field-config.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {

  field: IFieldConfig;
  group: FormGroup;

  constructor() { }

}
