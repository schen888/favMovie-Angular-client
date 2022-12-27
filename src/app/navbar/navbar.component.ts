import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public router: Router) {}

    /**
   * Logout the user. Navigate to welcome page and clear the localstorage.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
