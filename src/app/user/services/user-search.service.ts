/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { UserItem } from '../../user/user-item';
import { UserCredentials } from '../../user/user-credentials';
import { SearchFilter, SearchFilterOperators, SearchFilterFieldNames } from '../../search/search-filter';

// Services
import { UserBaseService } from './user.base.service';

@Injectable()
export class UserSearchService extends UserBaseService {
  constructor(public http: Http) {
    super(http);
  }

  private _users: UserItem[] = [];

  public getUsers() {
    return this._users;
  }

  public query(search: SearchFilter[], credentials: UserCredentials) {
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

  private _concatenateSearch(search: SearchFilter[]) {
    let result = [];

    search.forEach((item, index) => {
      if ('' !== item.search) {
        result.push(item);
      } else if (index > 0) {
        result.pop();
      }
    });

    return result.reduce((prev, curr) => {
      if ('' === curr.search) {
        // Empty search field
        return prev;
      } else if (curr.logical) {
        // Logical operator: and/or
        return prev + SearchFilterOperators[curr.operator];
      } else {
        // Search string, e.g: displayName sw "nijk"
        return prev + ` ${SearchFilterFieldNames[curr.field]} ${SearchFilterOperators[curr.operator]} \"${curr.search}\" `;
      }
    }, '').trim();
  }
}
