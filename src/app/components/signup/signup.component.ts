import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import isEmpty from 'src/app/validation/is-empty';
import validateRegisterInput from 'src/app/validation/validateRegisterInput';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _user: UserService
  ) {}

  ngOnInit(): void {}

  userName: any = '';
  password: any = '';
  password2: any = '';
  errors: any = {};
  profile: any;

  onSubmit() {
    const user = {
      userName: this.userName,
      password: this.password,
      password2: this.password2,
    };

    const { errors, isInvalid } = validateRegisterInput(user);

    if (isInvalid) {
      this.errors = errors;
    } else {
      if (isEmpty(this.profile)) {
        this.errors = {};
        delete this.password2;
        this.auth.register({
          userName: this.userName,
          password: this.password,
        });
        this.router.navigate(['/']);
      } else {
        this.errors.userName = 'Username already exists';
      }
    }
  }

  onChangeHandler() {
    this.profile = {};
    // this.checkExists(this.userName);
    this.userExists(this.userName);
  }

  userExists(username: any) {
    this.auth.userExists(username).subscribe((resp) => {
      this.profile = resp;
    });
  }

  // checkExists(username: String) {
  //   this._user.checkExists(username).subscribe((resp) => {
  //     resp.map((item: any) => {
  //       if (item.username == username) {
  //         this.profile = item;
  //       }
  //     });
  //   });
  // }
}
