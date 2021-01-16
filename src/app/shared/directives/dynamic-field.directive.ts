import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DropdownComponent } from '../components/inputs/dropdown/dropdown.component';
import { SubmitButtonComponent } from '../components/inputs/submit-button/submit-button.component';
import { TextInputComponent } from '../components/inputs/text-input/text-input.component';
import { IFieldConfig } from '../interfaces/field-config.interface';

const componentMapper = {
  textInput: TextInputComponent,
  dropdown: DropdownComponent,
  submitButton: SubmitButtonComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {

  @Input() field: IFieldConfig;
  @Input() group: FormGroup;

  private componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
