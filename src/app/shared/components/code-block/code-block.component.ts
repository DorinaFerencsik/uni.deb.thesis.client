import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent {

  @Input() code: string;

  constructor(private clipboard: Clipboard) { }

  public copy() {
    this.clipboard.copy(this.code);
  }

}
