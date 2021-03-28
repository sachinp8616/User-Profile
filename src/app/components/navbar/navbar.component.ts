import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private _user: UserService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  user: any = {};

  get userLoggedIn() {
    const isLoggedIn = !!localStorage.getItem('loggedIn');
    return isLoggedIn;
  }

  getProfile() {
    let userName: any = localStorage.getItem('loggedIn');

    this._user.getProfile().subscribe((resp: any) => {
      resp.map((item: any) => {
        if (item.username == JSON.parse(userName).name) {
          this.user = item;
        }
      });
    });
  }

  logoutUser() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }
}
