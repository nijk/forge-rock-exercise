/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { UserAuthService } from '../user/services/user-auth.service';
import { UserSearchService } from '../user/services/user-search.service';
import { UserMessagesService } from "../components/user-messages.service";

import { Auth } from '../auth/auth.component';
import { UserItem } from '../user/user-item';

@Component({
    selector: 'auth',
    providers: [ UserSearchService ],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    template: require('./search.component.html')
})

/*@RouteConfig([
    { path: '../', component: Auth, name: 'Login' },
])*/
export class Search {
    constructor(
        private _userAuthService: UserAuthService,
        private _userMessagesService: UserMessagesService,
        private _userSearchService: UserSearchService,
        private _router: Router) {

    }

    results: UserItem[] = [];

    model = { search: '' };

    errorMessage: string = '';

    ngOnInit() {
        if (!this._userAuthService.isUserAuthenticated()) {
            console.info('User not authenticated, redirecting');
            return this._router.navigate(['../Login']);
        }
    }

    public submit() {
        const credentials = this._userAuthService.getUserCredentials();
        this._userSearchService.query(this.model.search, credentials).subscribe(
            data => {
                this._userMessagesService.clearMessages();
                this.results = data.result;
                console.log('Search', this.model.search, credentials, data);
            },
            e => this._userMessagesService.addMessage(<string>e, 'danger')
        );
    }
}


