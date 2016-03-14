/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from 'angular2/core';

@Component({
    selector: 'user-card',
    template: require('./user-card.component.html'),
})
export class UserCard {
    constructor(){

    }

    @Input() user;
}