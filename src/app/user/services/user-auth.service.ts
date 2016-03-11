/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { UserBaseService } from './user.base.service';

import { UserItem } from '../../user/user-item';
import { UserCredentials } from "../../user/user-credentials";

@Injectable()
export class UserAuthService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _user: UserItem;

  public getUser() {
    return this._user;
  }

  public isUserAuthenticated() {
    return !!this._user;
  }

  public login(credentials: UserCredentials) {
    const path = `users/${credentials.username}`;
    const headers = new Headers({
      'X-Username': <string>credentials.username,
      'X-Password': <string>credentials.password
    });

    console.log('UserAuthService#login(): Get Data', headers, credentials);

    return Observable.create(observer => {
      this.send(path, headers).subscribe(
          json => {
            this._user = json;
            observer.next(this._user);
          },
          e => observer.error(e)
      )
    });
  }
}
