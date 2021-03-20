import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from '../../../interfaces/field-config.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {

  field: IFieldConfig;
  group: FormGroup;

  public isRequired = false;

  constructor() { }

  ngOnInit() {
    this.isRequired = !!this.field?.validations?.find(item => item.name === 'required');
  }
}
