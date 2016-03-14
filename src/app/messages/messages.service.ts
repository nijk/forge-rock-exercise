/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from 'angular2/core';

enum messageTypes {
    info,
    success,
    warning,
    danger
}

@Injectable()
export class MessagesService {
    constructor() {
    }

    private messages: Array<Object> = [];

    public getMessages() {
        return this.messages;
    }

    public addMessage(msg: string, type: string = 'warning', dismissible: boolean = true) {
        const messageEnum = messageTypes[type];
        this.messages.push({ msg, type: messageTypes[messageEnum], dismissible });
    }

    public removeMessage(i: number) {
        this.messages.splice(i, 1);
    }

    public clearMessages() {
        this.messages.splice(0, this.messages.length);
    }
}