import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    private apiSercice: ApiLandingService,
    private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.apiSercice.getBasic()
      .pipe(
        tap(res => {
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(res.picture);
          this.source = res.source;
        })
      ).subscribe();
  }

}
