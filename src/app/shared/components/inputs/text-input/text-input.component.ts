import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from '../../../interfaces/field-config.interface';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  field: IFieldConfig;
  group: FormGroup;

  public isRequired = false;

  constructor() {}

  ngOnInit() {
    this.isRequired = !!this.field?.validations?.find(item => item.name === 'required');
  }
}
