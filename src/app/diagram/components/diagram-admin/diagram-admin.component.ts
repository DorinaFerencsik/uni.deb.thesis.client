import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { keys as _keys } from 'lodash';
import { IFieldConfig } from 'src/app/shared/interfaces/field-config.interface';
import { FieldTypes } from 'utils/enums/common/field-types.enum';

import { ApiDiagramService } from '../../services/api-diagram.service';

@Component({
  selector: 'app-diagram-admin',
  templateUrl: './diagram-admin.component.html',
  styleUrls: ['./diagram-admin.component.scss'],
})
export class DiagramAdminComponent implements OnInit {

  public fields: IFieldConfig[] = [{
    name: 'datasource',
    label: 'Dataset source',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }, {
    name: 'dataname',
    label: 'Dataset name',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }, {
    name: 'name',
    label: 'Diagram name',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }, {
    name: 'desc',
    label: 'Diagram description',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }, {
    name: 'tags',
    label: 'Diagram tags (sep by comma)',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }];

  public paramFields: IFieldConfig[] = [{
    name: 'name',
    label: 'Name of parameter',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
      }],
  }, {
    name: 'label',
    label: 'Label of parameter (translate key or text)',
    type: FieldTypes.textInput,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
      }],
  },  {
    name: 'type',
    label: 'Type of parameter',
    type: FieldTypes.dropdown,
    options: [FieldTypes.textInput, FieldTypes.dropdown],
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: `COMMON.ERROR.REQUIRED`,
    }],
  }, {
    name: 'value',
    label: 'Default (example) value',
    type: FieldTypes.textInput,
  }];

  public formButtons = [{
    type: 'submitButton',
    label: 'Save',
  }];

  constructor(private apiDiagramService: ApiDiagramService) { }

  ngOnInit(): void {
  }

  public submit(event) {
    console.log('Submitted form ', event);
    const params = {
      data: {
        source: event.datasource,
        name: event.dataname,
      },
      name: event.name,
      desc: event.desc,
      tags: event.tags.split(','),
      params: [],
    };

    _keys(event).forEach(key => {
      if (key.startsWith('subGroup')) {
        params.params.push(event[key]);
      }
    });

    this.apiDiagramService.createDiagramType(params).subscribe();
  }

}
