/**
 * Created by nijk on 10/03/2016.
 */

import { Http, Response, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import {UserCredentials} from "../user-credentials";


export abstract class UserBaseService {
  constructor(public http: Http) {
  }

  private _endpoint: string = 'http://localhost:8080/rest2ldap/';

  private _handleError (error: Response) {
    const defaultErrorMessage: Object = { message: 'Server error' };
    const errorMessage = (error.json() || defaultErrorMessage).message;

    console.error(errorMessage, error.json());
    return Observable.throw(new Error(errorMessage));
  }

  protected send(path: string, credentials: UserCredentials, search?: URLSearchParams) {
    const params: Object = {};
    params['headers'] = new Headers({
      'X-Username': <string>credentials.username,
      'X-Password': <string>credentials.password
    });

    if (!!search) {
      params['search'] = search;
    }

    console.log('UserBaseService#send(): Params', params);

    return this.http.get(`${this._endpoint}${path}`, params)
        .map(res => res.json())
        .catch(this._handleError);
  }

}
