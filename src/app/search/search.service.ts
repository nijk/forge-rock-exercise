/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { UserItem, UserCredentials } from '../user/user.interfaces';
import { SearchFilter, SearchFilterFields } from './search.interfaces.ts';

// Enums
import { SearchFilterOperators, SearchFilterFieldNames } from './search.enums.ts';

// Services
import { UserBaseService } from '../user/user.base.service';

@Injectable()
export class SearchService extends UserBaseService {
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
    return search
        .filter((item) => !!(item.search || item.logical)) // SearchFilters with search values or logical operators
        .reduce((prev, curr, index, arr) => {
          // Search string, e.g: displayName sw "nijk"
          if (!curr.logical) {
            return prev + ` ${SearchFilterFieldNames[<number> curr.field]} ${SearchFilterOperators[<number> curr.operator]} \"${curr.search}\" `;
          }
          // Ensure logical operator is not last item or following another logical operator
          else if (index !== arr.length - 1 && !arr[index - 1].logical) {
            return prev + SearchFilterOperators[<number> curr.operator];
          }

          return prev;
        }, '')
        .trim();
  }
}
