/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { UserBaseService } from './user.base.service';

import { UserItem } from '../../user/user-item';
import { UserCredentials } from '../../user/user-credentials';

@Injectable()
export class UserSearchService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _users: UserItem[] = [];

  public getUsers() {
    return this._users;
  }

  public query(search: string, credentials: UserCredentials) {
    const params = new URLSearchParams();
    params.set('_queryFilter', 'name/givenName co \"ab\"');

    console.log('UserSearchService#login(): Get Data', params, credentials);

    return Observable.create(observer => {
      this.send('users', credentials, params).subscribe(
          json => {
            this._users = json;
            observer.next(this._users);
          },
          e => observer.error(e)
      )
    });
  }

}
