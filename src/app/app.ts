/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { RouterActive } from './directives/router-active';
import { FORM_PROVIDERS } from 'angular2/common';

// Services
import { UserAuthService } from './user/services/user-auth.service';
import { UserMessagesService } from './components/user-messages.service';

// Components
import { Auth } from './auth/auth.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, UserAuthService, UserMessagesService ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.css') ],
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
  }/*,
  { path: '/', redirectTo: ['Search'] }*/
])
export class App {
  name = 'ForgeRock';
  constructor(){
  }
}
