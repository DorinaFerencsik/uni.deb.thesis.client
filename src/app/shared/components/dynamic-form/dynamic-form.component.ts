import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IFieldConfig } from '../../interfaces/field-config.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: IFieldConfig[] = [];
  @Input() buttons: IFieldConfig[] = [];
  @Input() subGroupFields: IFieldConfig[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  public subGroups: {name: string, group: FormGroup}[] = [];
  public form: FormGroup;

  get value() {
    return this.form.value;
  }

  private subGroupCounter = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createControl();
    if (this.subGroupFields.length) {
      this.addSubGroup();
    }
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  addSubGroup() {
    const group = this.fb.group({});
    this.subGroupFields.forEach(field => {
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });

    this.form.addControl(`subGroup-${this.subGroupCounter}`, group);
    this.subGroups.push({name: `subGroup-${this.subGroupCounter}`, group});
    this.subGroupCounter++;
  }

  removeSubGroup(name: string) {
    this.form.removeControl(name);
    this.subGroups = this.subGroups.filter(item => item.name !== name);
  }

  private createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  private bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    // FIXME: mark subgroups as touched is not working
    this.subGroups.forEach(item => {
      Object.keys(item.group.controls).forEach(field => {
        const control = formGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    });
  }

}
