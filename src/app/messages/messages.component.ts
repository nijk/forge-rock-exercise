/**
 * Created by nijk on 10/03/2016.
 */

import { Component, Injectable } from 'angular2/core';
import { Alert } from 'ng2-bootstrap';

// Services
import { MessagesService } from "./messages.service.ts";

@Component({
    selector: 'user-messages',
    providers: [ Alert ],
    directives: [ Alert ],
    template: require('./messages.component.html')
})
export class Messages {
    constructor(public _userMessagesService: MessagesService) {
    }

    messages = this._userMessagesService.getMessages();

    closeMessage(i: number) {
        this._userMessagesService.removeMessage(i);
    }
}