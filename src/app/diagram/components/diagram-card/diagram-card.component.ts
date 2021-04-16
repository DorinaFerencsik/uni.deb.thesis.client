import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDiagramParam } from 'utils/interfaces/diagram';

@Component({
  selector: 'app-diagram-card',
  templateUrl: './diagram-card.component.html',
  styleUrls: ['./diagram-card.component.scss'],
})
export class DiagramCardComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() desc: string;
  @Input() image: any;
  @Input() tags: string[];
  @Input() filename: string;
  @Input() params: IDiagramParam[] = [];
  @Input() order: string;
  @Input() showUseButton = true;

  @Output() tagSelected = new EventEmitter();
  @Output() details = new EventEmitter();

  constructor(public router: Router, public sanitizer: DomSanitizer, private httpClient: HttpClient) {

  }

  ngOnInit() {
    if (this.image.startsWith('http')) {
      this.httpClient.get<{src: string}>(this.image).subscribe(res => {
        if (res.src) {
          this.image = this.sanitizer.bypassSecurityTrustUrl(res.src);
        } else {
          this.image = null;
        }
      });
    }
  }

  public createFromType() {
    this.router.navigate(['/app/diagram/create'], { queryParams: { type: this.id } });
  }

}
