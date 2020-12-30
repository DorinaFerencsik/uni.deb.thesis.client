import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IBasicUser } from 'src/utils/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public user$: Subject<IBasicUser>;

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
