/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { UserAuthService } from '../user/services/user-auth.service';
import { UserSearchService } from '../user/services/user-search.service';
import { Auth } from '../auth/auth.component';

@Component({
    selector: 'auth',
    providers: [ UserSearchService ],
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
        private _userAuthService: UserAuthService,
        private _userSearchService: UserSearchService,
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
        return this._userAuthService.isUserAuthenticated();
    }

    public submit() {
        /*this._userSearchService.query(this.model).subscribe(
            data => {
                this.errorMessage = '';
                console.log('Authenticated', this.model, this._userAuthService.getUser(), data);
            },
            e => this.errorMessage = e
        );*/
    }
}


