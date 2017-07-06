# Overview

The functionnal goal of this project is to edit a JSON file used by http://emotv.fr.
The real purpose was to play with next.js and investigate on server side rendering.

# Source structure

Under `server` folder is the code that is running only on server:
* server bootstraping
* server side rendering on first page load
* apis implementation

Under `pages` are located the entry point for each page. Check [next.js documentation](https://github.com/zeit/next.js) for more information. These JSX files can be executed server side (first render) or client side (page navigation).

Under `shared` code than can be executed both on the server and the client.

The babel conf has been externalized in .babelrc to be able to use modern javascript es6/es7 also on server side.