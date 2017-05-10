# konig-js

This repository stores the Konig javascript libraries and web applications.

## Build instructions

### Install node.js

See [Installing Node.js](https://nodejs.org/en/download/package-manager/)
and follow the instructions for your operating system.

### Install webpack
We use the [webpack](https://webpack.github.io/) packaging manager and its
development server.

```
npm install webpack -g
npm install webpack-dev-server -g
```

If you are new to webpack, check out the
[Webpack Tutorial](https://www.youtube.com/watch?v=9kJVYpOqcVU) on YouTube.

### Install JSDoc
We use [Jsdoc](http://usejsdoc.org/) to generate documentation for our Javascript
libraries.

```
npm install jsdoc -g
```


### Install Mocha
We use the [Mocha](https://mochajs.org/) test framework.

```
npm install mocha -g
```
### Install Atom
We recommend using the Atom editor.

Follow the instructions for
[Installing Atom](http://flight-manual.atom.io/getting-started/sections/installing-atom/).

Then, install the following packages:

 `docblockr` makes it easier to write JSDoc documentation comments.

```
apm install docblockr
```

`jsdoc-preview` allows you to open a rendered version of JSDoc documentation in
the current editor with `ctrl-shift-D`.

```
apm install jsdoc-preview
```

## Developer Tasks


### Generate JSDoc

```
jsdoc src/js -r -d jsdoc
```

## Coding Conventions

### Javascript Modules
Webpack uses the *node.js* convention for javascript modules.  If you are not
familiar with this convention, please read
[Node.js, Require and Exports](http://openmymind.net/2012/2/3/Node-Require-and-Exports/)
