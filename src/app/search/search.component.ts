/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { Auth } from '../auth/auth.component';
import { UserAuth } from '../user/services/user-auth';
import { UserSearch } from '../user/services/user-search';

@Component({
    selector: 'auth',
    providers: [ UserSearch ],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    template: require('./search.html')
})

/*@RouteConfig([
    { path: '../', component: Auth, name: 'Login' },
])*/
export class Search {
    constructor(
        public userAuth: UserAuth,
        private _search: UserSearch,
        private _router: Router) {

    }

    model: any = { username: '', password: '' };

    errorMessage: string = '';

    ngOnInit() {
        if (!this.isUserAuthenticated()) {
            console.info('User not authenticated, redirecting');
            return this._router.navigate(['../Login']);
        }
    }

    public isUserAuthenticated() {
        return this.userAuth.isUserAuthenticated();
    }

    public submit() {
        /*this._search.query(this.model).subscribe(
            data => {
                this.errorMessage = '';
                console.log('Authenticated', this.model, this._userAuth.getUser(), data);
            },
            e => this.errorMessage = e
        );*/
    }
}


