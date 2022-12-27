import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit{

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    localStorage.clear();
  }

  /**
   * Open the uer registration dialog when sign up button is clicked
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }

  /**
   * Open the uer login dialog when login button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }
}
