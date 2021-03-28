import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import validateProfileInput from '../../validation/validateProfileInput';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import isEmpty from 'src/app/validation/is-empty';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private _user: UserService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  user: any = {};

  errors: any = {};

  successMessage: any = '';
  errorMessage: any = '';

  onSubmit() {
    const { errors, isInvalid } = validateProfileInput(this.user);

    if (isInvalid) {
      this.errors = errors;
    } else {
      this.errors = {};
      this._user
        .saveProfile(this.user)
        .then((resp) => (this.successMessage = resp.message))
        .catch((err) => (this.errorMessage = err.message));
      this.user = {};
    }
  }

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  percentage!: Observable<Number | undefined>;

  onUpload(e: any) {
    let file = e.target.files[0];
    let filename = `${Date.now()}_${file.name}`;
    this.ref = this.storage.ref('images/' + filename);
    this.task = this.ref.put(file);
    this.percentage = this.task.percentageChanges();
    this.task.then(
      async () =>
        (this.user.imgUrl = await this.ref.getDownloadURL().toPromise())
    );
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
}
