/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

// Interfaces
import { UserCredentials } from '../user/user.interfaces';

// Services
import { UserAuthService } from './auth.service';
import { UserMessagesService } from "../messages/messages.service.ts";

// Components
import { UserMessages } from '../messages/messages.component';

@Component({
    selector: 'auth',
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, UserMessages ],
    template: require('./auth.component.html')
})
export class Auth implements OnInit {
    constructor(
        private _userAuthService: UserAuthService,
        private _userMessagesService: UserMessagesService,
        private _router: Router) {
    }

    model: UserCredentials = { username: '', password: '' };

    ngOnInit() {
        this._userMessagesService.clearMessages();
    }

    public getUser() {
        return this._userAuthService.getUser();
    }

    public isUserAuthenticated() {
        return this._userAuthService.isUserAuthenticated();
    }

    /**
     * Form submit handler
     */
    public submit() {
        this._userAuthService.login(this.model).subscribe(
            data => {
                this._userMessagesService.clearMessages();
                return this._router.navigate(['Search']);
            },
            e => {
                this._userMessagesService.addMessage(<string>e, 'danger');
            }
        );
    }
}
