fs-modules
=============

JavaScript and Angular components that work in conjunction with fs-styles

## How to Use

fs-modules comes with both Angular.js directives and native JavaScript functions. 

To include only the Angular directives, add `ng-fs-modules.js` to your JS assets. 

To include only the native JavaScript functions, include `fs-modules.js`. If your app does not have Angular running, you will also need to include `fs-modules/ngParser.js` before you include `fs-modules.js`.

## Why JavaScript Modules

Displaying static HTML structure that developers can copy and paste creates a snapshot of the code when the developer uses it. This creates inconsistencies in the styles if the module changes.

By using a JavaScript function (or Angular.js directive) that outputs the HTML structure, there is only one point of entry for the module. This means that every time the page is accessed, the most current version of the modules is used. This also means that any changes and updates to the module are reflected in the site immediately. 

## License
Copyright © 2014 by Intellectual Reserve, Inc. See the LICENSE file for license rights and limitations.
