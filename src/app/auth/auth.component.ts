/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { UserAuthService } from '../user/services/user-auth.service';
import { UserCredentials } from '../user/user-credentials';

import { UserMessages } from '../components/user-messages';
import { UserMessagesService } from "../components/user-messages.service";

@Component({
    selector: 'auth',
    providers: [],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        UserMessages
    ],
    template: require('./auth.component.html'),
    styles: [`
        body {
          padding: 20px;
        }
    `]
})
export class Auth implements OnInit {
    constructor(
        private _userAuthService: UserAuthService,
        private _userMessagesService: UserMessagesService) {

    }

    model: UserCredentials = { username: '', password: '' };

    ngOnInit() {
    }

    public getUser() {
        return this._userAuthService.getUser();
    }

    public isUserAuthenticated() {
        return this._userAuthService.isUserAuthenticated();
    }

    public submit() {
        this._userAuthService.login(this.model).subscribe(
            data => {
                this._userMessagesService.clearMessages();
                console.log('User Authenticated:', this._userAuthService.isUserAuthenticated());
            },
            e => {
                this._userMessagesService.addMessage(<string>e, 'danger');
                console.log('User Authenticated:', this._userAuthService.isUserAuthenticated());
            }
        );
    }
}


