/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { UserItem, UserCredentials } from '../user/user.interfaces';

// Services
import { UserBaseService } from '../user/user.base.service';


@Injectable()
export class AuthService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _user: UserItem;

  private _userCredentials: UserCredentials;

  public getUser() {
    return this._user;
  }

  public getUserCredentials() {
    // @todo: uncomment this for login bypass!
    /*return {
      username: 'user.0',
      password: 'password'
    };*/
    return this._userCredentials;
  }

  public isUserAuthenticated() {
    // @todo: uncomment this for login bypass!
    /*return true;*/
    return !!this._user;
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
