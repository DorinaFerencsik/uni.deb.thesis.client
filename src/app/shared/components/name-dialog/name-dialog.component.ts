import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss'],
})
export class NameDialogComponent {

  public formGroup: FormGroup;
  public title: string;
  public label: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { title: string, label: string },
              private dialogRef: MatDialogRef<NameDialogComponent>,
              private formBuilder: FormBuilder) {
    this.title = data.title || 'Default title';
    this.label = data.label || 'Name';
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  public submit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
