import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'uni-deb-thesis-client';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
  }
}
