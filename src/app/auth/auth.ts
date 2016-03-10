/**
 * Created by nijk on 10/03/2016.
 */

import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Title} from './services/title';

@Component({
    selector: 'auth',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        ...FORM_DIRECTIVES
    ],
    pipes: [ ],
    //styles: [ require('./home.css') ],
    template: require('./auth.html')
})
export class Auth {
    // Set our default values
    data = { value: '' };
    // TypeScript public modifiers
    constructor(public title: Title) {

    }

    ngOnInit() {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

}
