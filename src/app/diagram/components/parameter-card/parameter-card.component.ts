import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { IFieldConfig } from 'src/app/shared/interfaces/field-config.interface';
import { DATA_COLUMN_PARAM } from 'utils/constants/diagrams';
import { IDiagramParam } from 'utils/interfaces/diagram';

@Component({
  selector: 'app-parameter-card',
  templateUrl: './parameter-card.component.html',
  styleUrls: ['./parameter-card.component.scss'],
})
export class ParameterCardComponent implements OnInit, OnChanges {

  @ViewChild('myForm', {static: false}) myForm: DynamicFormComponent;

  @Input() params: IDiagramParam[];
  @Input() fileColNames: string[];
  @Output() formSubmit = new EventEmitter();

  public fields: IFieldConfig[];

  public formButtons = [{
    type: 'submitButton',
    label: 'Generate',
  }];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.fields = this.params.map(param => ({
      ...param,
      value: param.type !== 'dropdown' ? param.value : null,
      validations: param.validations?.map(v => ({
        name: v.type,
        validator: this.mapValidator(v.type, v.value),
        message: `COMMON.ERROR.${v.type}`,
        messageParam: v.value,
      })),
      options: param.type === 'dropdown' ? this.matDropdownOptions(param.name, param.options) : null,
    }));
    console.log('parameter card onchange');
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }

  submit(value: any) {
    console.log('submitted: ', value);
    this.formSubmit.emit(value);
  }

  private mapValidator(validatorType: string, validatorValue?: string) {
    switch (validatorType) {
      case 'required':
        return Validators.required;
      case 'pattern':
        return Validators.pattern(validatorValue);
      default:
        return null;
    }
  }

  private matDropdownOptions(fieldName: string, options?: string[]) {
    if (options && options[0] === DATA_COLUMN_PARAM) {
      return this.fileColNames;
    }
    // if (this.columnDropdownFields.includes(fieldName)) {
    //   return this.fileColNames;
    // }
    return options;
  }

}
