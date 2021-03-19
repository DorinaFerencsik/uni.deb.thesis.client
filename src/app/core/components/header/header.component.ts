import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IBasicUser } from 'src/utils/interfaces/user';
import { Roles } from 'utils/enums/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public user$: Subject<IBasicUser>;

  public readonly menuItems = [
    {
      label: 'Diagrams',
      url: 'app/diagram',
      // roles: [Roles.Basic],
    },
    {
      label: 'My files',
      url: 'app/files',
      roles: [Roles.Basic],
    },
    {
      label: 'Docs',
      url: '',
      roles: [],
    },
    {
      label: 'About',
      url: '',
      roles: [],
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.getUser();
  }

  public onLogin() {
    this.authService.login().subscribe();
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['landing']);
  }
}
