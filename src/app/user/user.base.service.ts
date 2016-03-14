/**
 * Created by nijk on 10/03/2016.
 */

import { Http, Response, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { UserCredentials } from "./user.interfaces";

export abstract class UserBaseService {
  constructor(public http: Http) {
  }

  private _endpoint: string = 'http://localhost:8080/rest2ldap/';

  /**
   * Send API call to endpoint with Headers & Parameters.
   * @param path
   * @param credentials
   * @param search
   * @returns {Observable<R>}
   */
  protected send(path: string, credentials: UserCredentials, search?: URLSearchParams) {
    const params: Object = {};
    params['headers'] = new Headers({
      'X-Username': <string> credentials.username,
      'X-Password': <string> credentials.password
    });

    if (!!search) {
      params['search'] = search;
    }

    return this.http.get(`${this._endpoint}${path}`, params)
        .map(res => res.json())
        .catch(this._handleError);
  }

  /**
   * Error handler
   * @param error
   * @returns {ErrorObservable}
   * @private
   */
  private _handleError (error: Response) {
    const errorMessage = (error.json() ||  { message: 'Server error' }).message;

    console.error(errorMessage, error.json());
    return Observable.throw(new Error(errorMessage));
  }
}
