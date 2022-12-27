import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';//Use this import to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service';//Import API call service
import { MatSnackBar } from '@angular/material/snack-bar';//Display notification

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };//Decorator

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {} //OnInit method
  

  /**
   * register a new user
   * 
   * @remarks
   * Make API call to register the user, if success, open snackBar to inform and close the login dialog,
   * if fail, open snackBar to show error message
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // Close dialog on success
     //console.log('registerUser() response1:', response);
     this.snackBar.open('Registered successfully!', 'OK', {
        duration: 4000
     });
    }, (response) => {
      //Error response
      console.log('registerUser()FailedRes:', response);
      this.snackBar.open(response, 'OK', {
        duration: 4000
      });
    });
  }
}
