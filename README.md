fs-modules
=============

JavaScript and Angular modules that work in conjunction with fs-styles

## Why JavaScript Modules

Displaying static HTML structure that developers can copy and paste creates a snapshot of the code when the developer uses it. This creates inconsistencies in the styles if the module changes.

By using a JavaScript function (or Angular.js directive) that outputs the HTML structure, there is only one point of entry for the module. This means that every time the page is accessed, the most current version of the modules is used. This also means that any changes and updates to the module are reflected in the site immediately. *See [A Maintainable Style Guide](http://ianfeather.co.uk/a-maintainable-style-guide/) for more details*

## How to Use

fs-modules comes with both native JavaScript functions and Angular.js directives. The modules are set up so that you can include all modules or only select modules based on your needs.

To include all of the JavaScript modules, add `fsModules.js` to your JS assets. If your app does not have Angular running, you will also need to include `fsModules.core/ngParser.js` before you include `fsModules.js`. If you only want certain modules, add `fsModules.core.js` to your JS assets (as well as `ngParser` if you don't have Angular) and then the modules you wish to load (e.g. `fsperson.js`).

To include all of the Angular directives, add `fsModules/ngFsModules.js` to your JS assets. If you only want certain modules, add `fsModules.core/ngFsModules.core.js` to your JS assets and then the modules you wish to load (e.g. `fsPerson/ngFsPerson.js`).

## Folder Organization

fs-modules is first a JavaScript library and second an Angular library. Because of this, the folder structure is designed around the JavaScript files.

Each module contains the JavaScript files needed for the module, a folder containing the Angular version of the module, and a test folder which both JavaScript and Angular will use to test the functionality of the module. Modules can also include template files and view model functions that both JavaScript and Angular will use.

```
js
├─ fsModules.core - core JavaScript functionality needed to parse angular style templates
|  ├─ ngFsModules.core - core Angular module and directives 
|  └─ tests - fsModules.core tests that are run in both JavaScript and Angular
| 
├─ myModule - JavaScript module
|  ├─ ngMyModule - Angular directives
|  ├─ templates - Angular templates shared between JavaScript and Angular
|  ├─ tests - module tests that are run in both JavaScript and Angular
|  └─ viewModels - JavaScript functions shared between JavaScript and Angular which create variables used in the templates
|
├─ fsModules - includes the JavaScript core and all JavaScript modules (fsPerson, etc.)
|  └─ ngFsModules - includes the Angular core and all Angular modules (ngFsPerson, etc.)
|
├─ locales - locale files for all modules 
└─ utils - utility functions shared between JavaScript and Angular
```

## Naming Conventions

### Modules

When naming modules, preface all modules with `fs`. For example, a module for rendering a person would be called `fsPerson`.

### Module Functions / Directives

When naming module functions or directives, preface the name with the module name (including the `fs`). Doing so helps other developers know exactly where the function or directive comes from. It also ensures that the Angular directive name does not conflict with any other directives that others may have created. For example, a function for rending a person's vital information would be called `fsPersonVitals`.

### Files

When naming files, start with the function name, followed by a `.`, and end with what type of function it is. This helps when other modules may want to use the same function name (e.g. `vitals`). For example, a JavaScript function that declares a directive for rendering a person's vital information would be called `fsPersonVitals.directive.js`.

### Angular

When naming the Angular counterpart of a module, follow all the same guidelines as a JavaScript module with one addition: add `ng` to the front of the module name and the modules files. Do not add the `ng` to the front of the Agular directive as it would conflict with the Angular library. For example, the directive for rendering a person's vitals would be called `fsPersonVitals`, while the file would be called `ngFsPersonVitals.directive.js`.

## License
Copyright © 2014 by Intellectual Reserve, Inc. See the LICENSE file for license rights and limitations.
