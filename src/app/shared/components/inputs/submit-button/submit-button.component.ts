import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from '../../../interfaces/field-config.interface';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {

  field: IFieldConfig;
  group: FormGroup;

  constructor() { }

}
