/**
 * Created by nijk on 10/03/2016.
 */

import { Component, Injectable } from 'angular2/core';
import { Alert } from 'ng2-bootstrap';

// Services
import { UserMessagesService } from "./user-messages.service";

@Component({
    selector: 'user-messages',
    providers: [ Alert ],
    directives: [ Alert ],
    template: require('./user-messages.html')
})
export class UserMessages {
    constructor(public _userMessagesService: UserMessagesService) {
    }

    messages = this._userMessagesService.getMessages();

    closeMessage(i: number) {
        this._userMessagesService.removeMessage(i);
    }
}