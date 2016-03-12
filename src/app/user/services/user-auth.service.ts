/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { UserItem } from '../../user/user-item';
import { UserCredentials } from "../../user/user-credentials";

// Services
import { UserBaseService } from './user.base.service';


@Injectable()
export class UserAuthService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _user: UserItem;

  private _userCredentials: UserCredentials/* = {
    // @fixme: remove hardcoded creds
    username: 'user.0',
    password: 'password'
  }*/;

  public getUser() {
    return this._user;
  }

  public getUserCredentials() {
    return this._userCredentials;
  }

  public isUserAuthenticated() {
    return !!this._user;/*true;*/ // @fixme: remove this!
  }

  public login(credentials: UserCredentials) {
    return Observable.create(observer => {
      this.send(`users/${credentials.username}`, credentials).subscribe(
          json => {
            this._user = json;
            this._userCredentials = credentials;
            observer.next(this._user);
          },
          e => observer.error(e)
      )
    });
  }
}
