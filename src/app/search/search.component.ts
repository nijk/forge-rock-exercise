/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

// Services
import { UserMessagesService } from "../messages/messages.service.ts";
import { UserAuthService } from '../auth/auth.service';
import { UserSearchService } from './search.service';

// Interfaces
import { UserItem } from '../user/user.interfaces';
import { SearchFilter, SearchFilterFields } from './search.interfaces.ts';

// Enums
import { SearchFilterOperators, SearchFilterFieldNames } from './search.enums.ts';

// Components
import { Auth } from '../auth/auth.component';
import { UserMessages } from '../messages/messages.component';
import { UserCard } from "../user/user-card.component";

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
    filters: SearchFilter[] = [ Object.assign({}, this._defaultFilter) ];

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
    public addFilter() {
        return this.filters.push( Object.assign({}, this._defaultLogicalFilter), Object.assign({}, this._defaultFilter) );
    }

    /**
     * Remove a searchFilter objects (including the preceding logical operator) from the filter.
     */
    public removeFilter(i: number) {
        // Also remove the previous item if index is not first item
        const start = (i > 0) ? i - 1 : i;
        this.filters.splice(start, 2);

        // Update search if there's a value in the first field.
        if (this.filters[0].search) {
            this.submit();
        }
    }

    /**
     * Form submit handler: User messaging and storage of results set.
     */
    public submit() {
        this._userMessagesService.clearMessages();
        const credentials = this._userAuthService.getUserCredentials();

        return this._userSearchService.query(this.filters, credentials).subscribe(
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
