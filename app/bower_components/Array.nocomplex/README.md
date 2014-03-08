# Array.nocomplex  
[![Build Status](https://secure.travis-ci.org/cagosta/Array.nocomplex.png?branch=master)](https://travis-ci.org/cagosta/Array.nocomplex)


## Introduction ##

Array.prototype augmentations, no complex.  


I know this is bad but _( _( _( this ).is ).ugly() while this.is.clean().
Furthemore, I promise to modify all .prototype invocations on modules that are becoming popular.  


## Array.prototype ###

All helpers are atomised in AMD modules. You can use it for instance with require.js or almond.js.  

You can require juste one, such as map ( `define('myModule', ['Array.nocomplex/map']);` ) or group exists, such as `Array/basics`, `Array/math` or `Array.nocomplex/all`

### Basics

Array/basics provide the following :
* map
* collect 
* first
* has
* last
* onEls
* remove
* removeOneValue
* except
* exceptFn
* uniq
* equals

#### map
```javascript
    [10,20].map(function(n) { return n * 2 }); // [20, 40]
```

#### collect 
Such as map, but provide a useful tricks :
```javascript
    [{ name : 'cyril'}, { name : 'piercus'}].collect('name') // ['cyril', 'piercus']
```

#### send
Useful, allow you to call a method on each element of the array
```javascript
[{ callMe : function(arg) { console.log(arg)}}, { callMe : function() { console.log('world')}}].send('callMe', 'hello'); // log 'hello' and then 'world'
```
 
#### where
Return a new array with all found occurences

#### find
Return the first found occurence wich evaluate to true

#### first 
Return array[0]

#### has
Return true if instance has value 
```javascript
['cyril', 'piercus'].has('cyril'); // true
```

#### onEls
Replaces every element of this with f(element)

#### remove
If found, the argument is removed from the array

#### last
Return the last element of the array

#### except
Return a new array without the element that are the same at the argument

#### isIn

#### equals

#### each

### Math

Useful helpers when dealing with geometry.

`Array/math` provide the following : 

* equals
* multiply
* divide
* minus
* add 
* round
* norm

## Demo ##
See [cagosta.github.io/Array.nocomplex](http://cagosta.github.io/Array.nocomplex) 

## Install ##

Array.nocomplex is coded as [amd module](http://requirejs.org/docs/whyamd.html) but can be installed with npm, bower or old-fashioned src=".min.js".

#### With npm: ####

```
npm install array-nocomplex
```

and use it with nodejs: 
```
var ArrayNocomplex = require('array-nocomplex')
```

#### With bower: ####

``` 
bower install Array.nocomplex
```

and use it with requirejs 

```javascript
require(['Array.nocomplex/Array.nocomplex'], function( ArrayNocomplex ){

})
```


#### With src=" .min.js" ####


Inside the `dist` folder, [download latest standalone minified version](https://raw.github.com/cagosta/Array.nocomplex/master/dist/Array.nocomplex-latest-standalone-min.js) or [development version](https://raw.github.com/cagosta/Array.nocomplex/master/dist/Array.nocomplex-latest-standalone.js) and include it in your html page:

```html
<script src="[path_to_source]/Array.nocomplex-latest-standalone-min.js%>"></script>
```

The module is available via the scope 

```javascript
window.ArrayNocomplex
```

## Documentation ##

See jsdoc-generated documentation in /documentation  

### Folder Structure ###

    app         ->  development files
    |- bower_components          ->  [bower](https://github.com/bower/bower) front-end packages
    |- main.js                   ->  main file for browser and node.js, handle AMD config
    |- array.nocomplex   -> main AMD module
    test        ->  unit tests
    |
    tasks       -> [Grunt](http://gruntjs.com/) tasks, see [generator-mangrove-module](https://github.com/cagosta/generator-mangrove-module)
    |
    dist        ->  distribution & build files
    |
    node_modules -> node packages
    |
    documentation  -> [jsdoc](http://usejsdoc.org/about-jsdoc3.html) generated documentation 


## Run unit tests ##

#### On the browser ####

Run `grunt test:browser` and open `test/` on your browser.

#### On a headless browser ####

`grunt test:headless` will run your tests in a headless browser, with [phantomjs](http://phantomjs.org/) and [mocha](http://visionmedia.github.io/mocha/)

### On node ####

`grunt test:node` will run your tests with node and mocha.  

Because of requirejs, the `mocha` command does not work.


## To do ## 
- check future default implementations  
- base all naming on lodash  


## Build your own ##

This project uses [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/) and [Require.js](http://requirejs.org/docs/optimization.html) for the build process. If for some reason you need to build a custom version install Node.js, `npm install` and run:

    grunt build

## Yeoman Mangrove module Generator ##

This module is based on a [Yeoman](https://github.com/yeoman/yeoman/wiki/Getting-Started) generator: [Generator-mangrove-module](https://github.com/cagosta/generator-mangrove-module)  
Check it for task-related references such as build, deploy etc ..

## License ##

[MIT License](http://www.opensource.org/licenses/mit-license.php)


### Authors 
* [Cyril Agosta](https://github.com/cagosta)
* [Sam Ton That](https://github.com/KspR)
* [Pierre Cole](https://github.com/piercus)


