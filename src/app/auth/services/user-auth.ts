import { Injectable, Optional } from 'angular2/core';
import { Http, Response, URLSearchParams } from 'angular2/http';
import { UserItem } from '../../user/user-item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserAuth {
  value = 'ForgeRock';
  constructor(public http: Http) {

  }

  login() {
    console.log('Title#getData(): Get Data');
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return Observable.create(observer => observer.next({ value: 'Data' }));
  }

}
