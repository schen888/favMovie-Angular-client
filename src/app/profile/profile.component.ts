import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: any={}

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiDataService.getUser().subscribe((res: any)=>{
      this.user={
        ...res,
        Birthday: new Date(res.Birthday).toLocaleDateString()
      };
      console.log('getUserInfo():', this.user);
      return this.user;
    })
  }

  onDeleteAccount(username: string): void {
    if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 3000
        });
      });
    }

    this.fetchApiDataService.deleteUser(username).subscribe(res=>{
      console.log(res);
    })
  }
}
