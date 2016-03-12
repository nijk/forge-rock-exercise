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
    const queryFilter = this._concatenateSearch(search);

    if (!queryFilter.length) {
      return Observable.throw('Nothing to search');
    }

    const params = new URLSearchParams();
    params.set('_queryFilter', queryFilter);

    return Observable.create(observer => {
      this.send('users', credentials, params).subscribe(
          json => {
            this._users = json;
            observer.next(this.getUsers());
          },
          e => observer.error(e)
      )
    });


  }

  private _concatenateSearch(search: SearchQuery[]) {
    let result = [];

    search.forEach((item, index) => {
      if ('' !== item.search) {
        result.push(item);
      } else if (index > 0) {
        result.pop();
      }
    });

    console.info('concat search', result);

    return result.reduce((prev, curr) => {
      let field = '';
      let op = '';
      let search = '';

      // If the search field is empty get out quick
      if ('' === curr.search) {
        return prev;
      }

      if (curr.logical) {
        op = SearchOperators[curr.operator];
      } else {
        field = 'name/familyName';
        op = SearchOperators[curr.operator];
        search = `\"${curr.search}\"`;
      }

      return prev + `${field} ${op} ${search} `;
    }, '').trim();
  }

}
