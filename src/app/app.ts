/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import { Auth } from './auth/auth.component';
import { UserAuthService } from './user/services/user-auth.service';
import { UserMessagesService } from './components/user-messages.service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    UserAuthService,
    UserMessagesService
  ],
  directives: [
    ...ROUTER_DIRECTIVES,
    RouterActive
  ],
  styles: [],
  template: require('./app.html')
})
@RouteConfig([
  {
    path: '/login',
    component: Auth,
    name: 'Login'
  },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  //{ path: '/auth', loader: () => require('es6-promise!./auth/auth.component')('Auth'), name: 'Auth' },
  {
    path: '/search',
    loader: () => require('es6-promise!./search/search.component')('Search'),
    name: 'Search',
    useAsDefault: true
  },
  { path: '/**', redirectTo: ['Search'] }
])
export class App {
  name = 'ForgeRock';
  constructor(){
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
