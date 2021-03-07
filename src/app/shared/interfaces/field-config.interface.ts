import { IBasicField } from 'utils/interfaces/common/basic-field.interface';

import { IFieldValidator } from './field-validator.interface';

export interface IFieldConfig extends IBasicField {
  inputType?: string;
  validations?: IFieldValidator[];
}
