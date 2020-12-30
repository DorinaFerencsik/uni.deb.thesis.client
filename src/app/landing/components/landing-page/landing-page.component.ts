import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

import { ApiLandingService } from '../../services/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  public imageSrc;
  public source: string;

  constructor(
    private apiService: ApiLandingService,
    private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.apiService.generate()
      .pipe(
        tap(res => {
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(res.result);
          this.source = res.source;
        })
      ).subscribe();
  }

}
