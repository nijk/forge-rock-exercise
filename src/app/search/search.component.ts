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
import { SearchFilter, SearchFilterOperators, SearchFilterFields, SearchFilterFieldNames } from './search-filter';

// Components
import { Auth } from '../auth/auth.component';
import { UserMessages } from '../components/user-messages';
import { UserCard } from "../components/user-card";

@Component({
    selector: 'auth',
    providers: [ UserSearchService ],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, UserMessages, UserCard ],
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

    fields: Object[] = this._createFields();

    operators: Object[] = this._createOperators();

    logicalOperators: Object[] = this._createLogicalOperators();

    private _defaultFilter: SearchFilter = {
        search: '',
        operator: SearchFilterOperators['co'],
        field: SearchFilterFieldNames['displayName']
    };

    private _defaultLogicalFilter: SearchFilter = { operator: SearchFilterOperators['and'], logical: true };

    /**
     * Create a filters array by cloning the defaultFilter object
     */
    filters: SearchFilter[] = [ Object.create(this._defaultFilter) ];

    ngOnInit() {
        if (!this._userAuthService.isUserAuthenticated()) {
            console.warn('User not authenticated, redirecting');
            return this._router.navigate(['Login']);
        }
    }

    /**
     * Add new searchFilter objects to the filter.
     * Pushes logicalFilter (operator) and searchFilter objects to the filters array.
     */
    public addAnother() {
        this.filters.push( Object.create(this._defaultLogicalFilter), Object.create(this._defaultFilter) );
    }

    /**
     * Form submit handler: User messaging and storage of results set.
     */
    public submit() {
        this._userMessagesService.clearMessages();
        const credentials = this._userAuthService.getUserCredentials();

        this._userSearchService.query(this.filters, credentials).subscribe(
            data => {
                const messageType = (!!data.resultCount) ? 'success' : 'warning';
                this._userMessagesService.addMessage(`${data.resultCount} results found`, messageType, false);
                this.results = data.result;
            },
            e => this._userMessagesService.addMessage(<string>e, 'danger', false)
        );
    }
    
    private _createFields() {
        return [
            { value: SearchFilterFieldNames['displayName'], label: 'Display name' },
            { value: SearchFilterFieldNames['userName'], label: 'User name' },
            { value: SearchFilterFieldNames['name/givenName'], label: 'First name' },
            { value: SearchFilterFieldNames['name/familyName'], label: 'Surname' },
            { value: SearchFilterFieldNames['contactInformation/emailAddress'], label: 'Email address' },
            { value: SearchFilterFieldNames['contactInformation/telephoneNumber'], label: 'Telephone number' }
        ];
    }
    
    private _createOperators() {
        return [
            { value: SearchFilterOperators['sw'], label: 'starts with' },
            { value: SearchFilterOperators['co'], label: 'contains' },
            { value: SearchFilterOperators['eq'], label: 'equals' }
        ]; 
    }
    
    private _createLogicalOperators() {
        return [
            { value: SearchFilterOperators['and'], label: 'and' },
            { value: SearchFilterOperators['or'], label: 'or' }
        ];
    }
}
