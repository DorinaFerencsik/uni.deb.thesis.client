import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { clone } from 'lodash';

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
  public options: string[];

  constructor() { }

  ngOnInit() {
    this.options = clone(this.field.options);
    this.isRequired = !!this.field?.validations?.find(item => item.name === 'required');
    if (!this.isRequired) {
      this.options.unshift(null);
    }
  }
}
