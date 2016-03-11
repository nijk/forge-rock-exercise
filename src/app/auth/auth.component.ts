/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { UserAuth } from '../user/services/user-auth';
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
        public userAuth: UserAuth,
        public _userMessagesService: UserMessagesService) {

    }

    model: UserCredentials = { username: '', password: '' };

    ngOnInit() {
    }

    public getUser() {
        return this.userAuth.getUser();
    }

    public isUserAuthenticated() {
        return this.userAuth.isUserAuthenticated();
    }

    public submit() {
        this.userAuth.login(this.model).subscribe(
            data => {
                this._userMessagesService.clearMessages();
                console.log('Authenticated', this.model, this.userAuth.getUser(), data);
            },
            e => {
                this._userMessagesService.addMessage(<string>e, 'danger');
            }
        );
    }
}


