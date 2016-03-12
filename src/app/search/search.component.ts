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
import { SearchQuery, SearchOperators, SearchFields, SearchFieldNames } from '../search/search-query';

// Components
import { Auth } from '../auth/auth.component';
import { UserMessages } from '../components/user-messages';

@Component({
    selector: 'auth',
    providers: [ UserSearchService ],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, UserMessages ],
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

    /**
     * Create a query model by cloning the defaultQuery object
     */
    model: SearchQuery[] = [ Object.create(this._defaultQuery) ];

    private _defaultQuery: SearchQuery = {
        search: '',
        operator: SearchOperators['co'],
        field: SearchFieldNames['displayName']
    };

    private _defaultLogicalQuery: SearchQuery = { operator: SearchOperators['and'], logical: true };

    ngOnInit() {
        if (!this._userAuthService.isUserAuthenticated()) {
            console.warn('User not authenticated, redirecting');
            return this._router.navigate(['Login']);
        }
    }

    /**
     * Add new searchQuery objects to the model.
     * Pushes logicalQuery (operator) and searchQuery objects to the model.
     */
    public addAnother() {
        this.model.push( Object.create(this._defaultLogicalQuery), Object.create(this._defaultQuery) );
    }

    /**
     * Form submit handler: User messaging and storage of results set.
     */
    public submit() {
        this._userMessagesService.clearMessages();
        const credentials = this._userAuthService.getUserCredentials();

        this._userSearchService.query(this.model, credentials).subscribe(
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
            { value: SearchFieldNames['displayName'], label: 'Display name' },
            { value: SearchFieldNames['name/givenName'], label: 'First name' },
            { value: SearchFieldNames['name/familyName'], label: 'Surname' },
            { value: SearchFieldNames['contactInformation/emailAddress'], label: 'Email address' },
            { value: SearchFieldNames['contactInformation/telephoneNumber'], label: 'Telephone number' }
        ];
    }
    
    private _createOperators() {
        return [
            { value: SearchOperators['sw'], label: 'starts with' },
            { value: SearchOperators['co'], label: 'contains' },
            { value: SearchOperators['eq'], label: 'equals' }
        ]; 
    }
    
    private _createLogicalOperators() {
        return [
            { value: SearchOperators['and'], label: 'and' },
            { value: SearchOperators['or'], label: 'or' }
        ];
    }
}
