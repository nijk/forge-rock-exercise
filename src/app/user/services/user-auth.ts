/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { UserItem } from '../../user/user-item';
import { UserCredentials } from "../../user/user-credentials";

@Injectable()
export class UserAuth {
  value = 'ForgeRock';
  constructor(public http: Http) {

  }

  private _user: UserItem;

  private _authenticated: boolean = false;

  private _endpoint: string = 'http://localhost:8080/rest2ldap/users/';

  private _handleError (error: Response) {
    const defaultErrorMessage: Object = { message: 'Server error' };
    const errorMessage = (error.json() || defaultErrorMessage).message;

    console.error(errorMessage, error.json());
    return Observable.throw(new Error(errorMessage));
  }

  public getUser() {
    return this._user;
  }

  public isUserAuthenticated() {
    console.info('User is authenticated', this._authenticated);
    return this._authenticated;
  }

  public login(credentials: UserCredentials) {
    const headers = new Headers({
      'X-Username': credentials.username || '',
      'X-Password': credentials.password || ''
    });

    console.log('UserAuth#login(): Get Data', headers, credentials);

    return this.http.get(`${this._endpoint}${credentials.username}`, { headers: headers })
        .map(res => {
          const response = res.json();

          this._authenticated = true;
          return this._user = response;
        })
        .catch(this._handleError);
  }

}
