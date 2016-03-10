/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { UserAuth } from '../user/services/user-auth';
import { UserCredentials } from '../user/user-credentials';

@Component({
    selector: 'auth',
    providers: [],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    template: require('./auth.html')
})

export class Auth {
    constructor(public userAuth: UserAuth) {

    }

    model: UserCredentials = { username: '', password: '' };

    errorMessage: string = '';

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
                this.errorMessage = '';
                console.log('Authenticated', this.model, this.userAuth.getUser(), data);
            },
            e => this.errorMessage = e
        );
    }
}


