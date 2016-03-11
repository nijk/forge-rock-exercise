/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { UserItem } from '../../user/user-item';
import { UserCredentials } from "../../user/user-credentials";

@Injectable()
export class UserSearchService {
  constructor(public http: Http) {

  }

  private _users: UserItem[] = [];

  private _endpoint: string = 'http://localhost:8080/rest2ldap/users/';

  private _handleError (error: Response) {
    const defaultErrorMessage: Object = { message: 'Server error' };
    const errorMessage = (error.json() || defaultErrorMessage).message;

    console.error(errorMessage, error.json());
    return Observable.throw(new Error(errorMessage));
  }

  public getUser() {
    return this._users;
  }

  public query(credentials: UserCredentials) {
    const headers = new Headers({
      'X-Username': credentials.username || '',
      'X-Password': credentials.password || ''
    });

    console.log('UserAuthService#login(): Get Data', headers, credentials);

    return this.http.get(`${this._endpoint}${credentials.username}`, { headers: headers })
        .map(res => {
          const response = res.json();
          return this._users = response;
        })
        .catch(this._handleError);
  }

}
