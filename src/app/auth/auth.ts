/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { UserAuth } from './services/user-auth';

class UserModel {
    username: string;
    password: string;
}

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
    model = new UserModel();
    // Set our default values
    data = { value: '' };
    // TypeScript public modifiers
    constructor(public userAuth: UserAuth) {

    }

    ngOnInit() {
        console.log('hello `Home` component');
        this.userAuth.login().subscribe(data => this.data = data);
    }

    submit() {
        console.log('Submit Form', this.model);
    }
}


