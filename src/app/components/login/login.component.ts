import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import validateRegisterInput from 'src/app/validation/validateRegisterInput';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  userName = '';
  password = '';
  password2 = '';
  errors: any = {};

  onSubmit() {
    const user = {
      userName: this.userName,
      password: this.password,
      password2: this.password,
    };

    const { errors, isInvalid } = validateRegisterInput(user);

    if (isInvalid) {
      this.errors = errors;
    } else {
      this.errors = {};

      this.auth.login(this.userName).subscribe((resp) => {
        if (resp.length > 0) {
          const [user] = resp;
          bcrypt.compare(this.password, user.password).then((isMatch) => {
            console.log(isMatch);

            if (isMatch) {
              localStorage.setItem(
                'loggedIn',
                JSON.stringify({ name: user.userName })
              );
              this.router.navigate(['user-profile']);
            } else {
              this.errors.password = 'Incorrect Password!';
            }
          });
        } else {
          this.errors.userName = 'User does not exists!';
        }
      });
    }
  }
}
