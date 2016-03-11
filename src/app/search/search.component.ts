/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

// Services
import { UserAuthService } from '../user/services/user-auth.service';
import { UserSearchService } from '../user/services/user-search.service';
import { UserMessagesService } from "../components/user-messages.service";

// Interfaces
import { UserItem } from '../user/user-item';
import { SearchQuery, SearchOperators, SearchOperands } from '../search/search-query';

// Components
import { Auth } from '../auth/auth.component';

@Component({
    selector: 'auth',
    providers: [ UserSearchService ],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    template: require('./search.component.html')
})

export class Search implements OnInit {
    constructor(
        private _userAuthService: UserAuthService,
        private _userMessagesService: UserMessagesService,
        private _userSearchService: UserSearchService,
        private _router: Router) {

    }

    results: UserItem[] = [];

    query: SearchQuery[] = [
        { search: 'a', operator: SearchOperators['co'] },
        { operator: SearchOperators['and'] },
        { search: 'b', operator: SearchOperators['co'] }
    ];

    errorMessage: string = '';

    ngOnInit() {

        console.info('Initial Query', this.query);

        if (!this._userAuthService.isUserAuthenticated()) {
            console.warn('User not authenticated, redirecting');
            return this._router.navigate(['Login']);
        }
    }

    public submit() {
        const credentials = this._userAuthService.getUserCredentials();
        this._userSearchService.query(this.query, credentials).subscribe(
            data => {
                this._userMessagesService.clearMessages();
                this.results = data.result;
                console.log('Search', this.query, data);
            },
            e => this._userMessagesService.addMessage(<string>e, 'danger')
        );
    }
}


