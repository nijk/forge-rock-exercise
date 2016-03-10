/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import { Auth } from './auth/auth.component';
import { UserAuth } from './user/services/user-auth';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, UserAuth ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  styles: [`
    nav ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    nav li {
      display: inline;
    }
    nav li.active {
      background-color: lightgray;
    }
  `],
  template: `
    <header>
      <nav>
        <h1>{{ name }}</h1>
        <ul>
          <li router-active>
            <a [routerLink]=" ['Login'] ">Login</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['Search'] ">Search</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  { path: '/login', component: Auth, name: 'Login', useAsDefault: true },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  //{ path: '/auth', loader: () => require('es6-promise!./auth/auth.component')('Auth'), name: 'Auth' },
  { path: '/search', loader: () => require('es6-promise!./search/search.component')('Search'), name: 'Search' },
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
