# Forge Rock frontend exercise

## Introduction

During this task I have chosen to use Angular2, Typescript and RxJS.
     
## Approach

- Angular2 (ng2) using Typescript 1.8
- Favoured Webpack/CommonJS over BrowserSync/SystemJS
- Bootstrap CSS Framework
- ng2 services:
    - User: Creates `UserBaseService` as abase class for XHR requests to user resource on API
    - Auth: Extends `UserBaseService` for authentication requests
    - Search: Extends `UserBaseService` for search requests 
    
## Improvements/Considerations

TODO

## Install

`npm install`

## Run application

`npm run build`

Visit [http://localhost:8080/test/dist]() or [http://localhost:8080/test/]().

### License
This project is released under the [MIT license](https://github.com/nijk/potato-front-end-task/blob/master/LICENSE).
