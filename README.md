# UOC Boilerplate

UOC Boilerplate is a starter template for the Advanced HTML and CSS Tools course from the [Master's Program in Multimedia Applications](https://estudis.uoc.edu/ca/masters-universitaris/aplicacions-multimedia/presentacio) and the [Master's Program in Web App and Website Development](https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio) at the [Universitat Oberta de Catalunya](https://www.uoc.edu). It aims to provide a basic, modern frontend web development starter pack based on Parcel and including a Sass compiler, an ES6 transpiler, minifiers, and development tools.

This is the 2.0 version of UOC Boilerplate, available since the UOC 2018-2 semester.


## Requirements

[Node.js](http://nodejs.org/) >= 10.15.x


## Getting started

Clone this repository with `git clone`, or download a .zip file using the top right green button.

Using the Terminal, navigate to the project folder and run `npm install`.


## Features

* Uses [Parcel](https://parceljs.org) module bundler.
* NPM scripts for fast development and production build (see Commands below).

### Stylesheets

* [Sass/SCSS](https://sass-lang.com) to CSS compilation.
* [PostCSS](https://postcss.org/) features:
    * Transpile modern CSS with [`postcss-preset-env`](https://preset-env.cssdb.org/features).
    * Automatically add CSS prefix to unsupported properties with [`autoprefixer`](https://autoprefixer.github.io/).
    * Automatically minify and optimize CSS code on production build with [`postcss-clean`](https://github.com/leodido/postcss-clean).

### Scripts

* Allow for modern JavaScript (ES201x/ES8/ES7/ES6…) which is automatically transpiled to ES5 and minifed in production builds, with [Babel](https://babeljs.io/).

### Development

* Development server launch and live reloading on file changes.
* Friendly error reporting.


## How to use this boilerplate

Only edit files located in the `src/` folder. Always run the following commands during the development stage and for production builds. Please note that it is expected that all projects built with this boilerplate are compiled using `npm run build` before they are published.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs a local web server for development and opens the browser to display it. Automatically compiles styles and scripts whenever a file in `src/` is changed, and live reloads the browser. This is what *must be run* on the development stage. |
| `npm run build` | Compiles and minifies and optimizes the files in the assets folder. The generated compiled and optimized files are located in the `dist/` folder. This is what *must be run* before publishing the project. The publishable files are the ones located in the `dist/` folder. |
| `npm run clean` | Deletes the current `/dist` folder. |
| `npm run test` | Displays a success message if everything is working as expected. |


## Need help? / Want to help out?

Feel free to create a [new issue](https://github.com/uoc-advanced-html-css/uoc-boilerplate/issues/new/) or drop me a line at jorditarrida@uoc.edu.

Are you using this Boilerplate for your projects or for educational purposes? I would love to hear about it!
