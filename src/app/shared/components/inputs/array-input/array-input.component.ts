import { ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { IFieldConfig } from 'src/app/shared/interfaces/field-config.interface';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
})
export class ArrayInputComponent implements OnInit {
  field: IFieldConfig;
  group: FormGroup;
  public isRequired = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  values: number[] = [];

  innerControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.isRequired = !!this.field?.validations?.find(item => item.name === 'required');
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.values.push(+value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.group.controls[this.field.name].setValue(this.values);
  }

  remove(item: number): void {
    const index = this.values.indexOf(item);

    if (index >= 0) {
      this.values.splice(index, 1);
      this.group.controls[this.field.name].setValue(this.values);
    }
  }
}
