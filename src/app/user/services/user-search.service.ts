/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { UserBaseService } from './user.base.service';

// Interfaces
import { UserItem } from '../../user/user-item';
import { UserCredentials } from '../../user/user-credentials';
import { SearchQuery, SearchOperators } from '../../search/search-query';

@Injectable()
export class UserSearchService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _users: UserItem[] = [];

  public getUsers() {
    return this._users;
  }

  public query(search: SearchQuery[], credentials: UserCredentials) {
    let queryFilter = '';

    queryFilter = search.reduce((prev, curr) => {
      let field = '';
      let op = '';
      let search = '';
      if (curr.operator && curr.search) {
        field = 'name/familyName';
        op = SearchOperators[curr.operator];
        search = `\"${curr.search}\"`;
      } else if (curr.operator && !curr.search) {
        op = SearchOperators[curr.operator];
      }

      return prev + `${field} ${op} ${search} `;
    }, queryFilter).trim();

    // @todo: loop through searchQuery and generate the queryFilter

    const params = new URLSearchParams();
    params.set('_queryFilter', queryFilter);

    console.log('UserSearchService#query(): search', search, queryFilter);

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
