export interface IFieldValidator {
  name: string;
  validator: any;
  message: string;
  messageParam?: string;
}
