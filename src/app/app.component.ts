import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Roles } from 'src/utils/enums/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'uni-deb-thesis-client';

  constructor(
    private permissionsService: NgxPermissionsService,
    private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');

    const roles = Object.keys(Roles).map(key => Roles[key] as string);
    this.permissionsService.loadPermissions(roles);
  }
}
