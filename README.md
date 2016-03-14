# Forge Rock frontend exercise
     
## Approach

- Angular2 (ng2) using Typescript 1.8
- Favoured Webpack/CommonJS tooling over BrowserSync/SystemJS
- Bootstrap v3 CSS Framework
- Features:
    - Messages: for displaying messages to the user
    - User: provides base class for Auth & Search services. Provides user-card component 
    - Auth: provides service for authenticating users. Provides login page component
    - Search: provides service for searching users. Provides search page component
    
- ng2 services:
    - User: Creates `UserBaseService` as a base class for XHR requests to user resource on API
    - Auth: Extends `UserBaseService` for authentication requests
    - Search: Extends `UserBaseService` for search requests 
    
## Improvements/Considerations

To fully complete this project to production standards, the items that I would address are:

- Fix the issue with search field autofocus, especially when adding or removing search form input-groups
- Change login bypass comments to a config controlled value and ensure usage only in dev environment. This has been left as-is for developer/tester convenience only 
- Unit testing
- End 2 end testing
- Break down some of the larger components into sub-components, e.g search form input-groups
- Convert CSS to SASS/LESS using a mobile-first approach and split styling into a modular structure for each ng2 feature
- Add some visual feedback whilst during API requests, e.g a spinner or loader that indicates the app is waiting on request
- Limit displayed results and add a pager or infinite scroll behaviour
- Improve the wording of the API error messages to be more user friendly
- Configure the backend to support required client side routes, so that users can navigate directly to [http://localhost:8080/test/dist/search]() if authenticated
- Add a representation of the searchFilter to the client side router so that searches can be bookmarked and shared, e.g. [http://localhost:8080/test/dist/search/first-name/equals/nick/and/email-address/contains/forgerock.com]()
- Add the appropriate logo, navigation utility (login/logout/account), footer (copyright/terms/privacy & any external links)
- Add authentication tokens via [JWT](https://jwt.io/) - this requires support via the backend
- Configure the backend to deliver resources from the `dist/` directory to avoid the need for it as a URL slug
- Test cross browser/device & fix any issues
- Provide `<noscript>` content for browsers where JS is disabled
- Minify/Uglify the JS/CSS/HTML resources for smaller payload size
- Test app performance and make improvements where necessary
- Adjust/refactor code based on peer feedback

## Install

`npm install`

## Run application

`npm run build`

Visit [http://localhost:8080/test/dist]().
Alternatively visit [http://localhost:8080/test/]() & click 'start app'.

### License
This project is released under the [MIT license](https://github.com/nijk/potato-front-end-task/blob/master/LICENSE).
