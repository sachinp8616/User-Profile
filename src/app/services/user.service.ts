import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  saveProfile(profile: any) {
    if (profile.key) {
      // Update profuile
      return this.db
        .list('profiles')
        .update(profile.key, profile)
        .then(() => ({
          message: 'Profile Updated successfully',
        }))
        .catch(() => ({ message: 'error while updating profile.' }));
    } else {
      // create profile
      let username: any = localStorage.getItem('loggedIn');

      return this.db
        .list('profiles')
        .push({
          ...profile,
          username: JSON.parse(username).name,
        })
        .then(() => ({
          message: 'Profile Created successfully',
        }))
        .catch(() => ({ message: 'error while creating profile.' }));
    }
  }

  getProfile() {
    return this.db
      .list('profiles')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((item) => ({
            key: item.key,
            ...item.payload.exportVal(),
          }))
        )
      );
  }

  // checkExists(username: String) {
  //   return this.db
  //     .list('profiles')
  //     .snapshotChanges()
  //     .pipe(
  //       map((changes) =>
  //         changes.map((item) => ({
  //           key: item.key,
  //           ...item.payload.exportVal(),
  //         }))
  //       )
  //     );
  // }
}
