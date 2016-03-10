/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { UserAuth } from './services/user-auth';
import { UserCredentials } from '../user/user-credentials';

@Component({
    selector: 'auth',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [ UserAuth ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    pipes: [ ],
    //styles: [ require('./home.css') ],
    template: require('./auth.html')
})

export class Auth {
    constructor(public userAuth: UserAuth) {

    }

    model: UserCredentials = { username: '', password: '' };

    errorMessage: string = '';

    ngOnInit() {
    }

    getUser() {
        return this.userAuth.getUser();
    }

    submit() {
        this.userAuth.login(this.model).subscribe(
            data => {
                this.errorMessage = '';
                console.log('Authenticated', this.model, this.userAuth.getUser(), data);
            },
            e => this.errorMessage = e
        );
    }
}


