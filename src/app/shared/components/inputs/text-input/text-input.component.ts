import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from '../../../interfaces/field-config.interface';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  field: IFieldConfig;
  group: FormGroup;

  constructor() {}

}
