# UOC Boilerplate

UOC Boilerplate is a starter template for the Advanced HTML and CSS Tools course from the Master's Program in Multimedia Applications at the Universitat Oberta de Catalunya. It aims to provide a basic, modern frontend web development starter pack based on Webpack and including a SASS compiler, ES6 transpiler, minifiers, image optimizers and development tools.


## Requirements

[Node.js](http://nodejs.org/) >= 8.9.x


## Installation

Clone this repository with `git clone`, or download a .zip file using the top right green button.

Using the Terminal, navigate to the project folder and run `npm install`.


## How to use this boilerplate

Only edit files located in the `src/` folder.

### Build commands

To launch a local development server and live monitor changes, run this command on the project folder:

* `npm run start`

To build compiled assets, run one of these commands on the project folder:

* `npm run build` - Compile the files on the assets folder, inject `<style>` and `<script>` tags on the .html files.
* `npm run build:production` - The same as the command above but also optimize assets.

The compiled assets will be saved to the `dist/` folder.
