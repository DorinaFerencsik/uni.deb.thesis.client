import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFieldConfig } from 'src/app/shared/interfaces/field-config.interface';
import { IDiagramParam } from 'utils/interfaces/diagram';

@Component({
  selector: 'app-parameter-card',
  templateUrl: './parameter-card.component.html',
  styleUrls: ['./parameter-card.component.scss'],
})
export class ParameterCardComponent implements OnInit {

  @Input() params: IDiagramParam[];
  @Input() fileColNames: string[];

  public fields: IFieldConfig[];

  public formButtons = [{
    type: 'submitButton',
    label: 'Save',
  }];

  private readonly columnDropdownFields = ['axisX', 'axisY', 'axisZ'];

  constructor() { }

  ngOnInit(): void {
    this.fields = this.params.map(param => ({
      ...param,
      validations: param.validations?.map(v => ({
        name: v.type,
        validator: this.mapValidator(v.type, v.value),
        message: `COMNMON.ERROR.${v.type}`,
        messageParam: v.value,
      })),
      options: param.type === 'dropdown' ? this.matDropdownOptions(param.name, param.options) : null,
    }));
  }

  submit(value: any) {

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
    if (this.columnDropdownFields.includes(fieldName)) {
      return this.fileColNames;
    }
    return options;
  }

}
