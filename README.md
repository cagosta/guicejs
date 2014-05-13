# guicejs  
[![Build Status](https://secure.travis-ci.org/cagosta/guicejs.png?branch=master)](https://travis-ci.org/cagosta/guicejs)


## Introduction ##

This is just a draft of a 'guice like' dependency injection plugin for [ Seed ](http://github.com/cagosta/Seed )

I had issues testing a relatively large javascript application and I found factories not elegant, time-consuming and error-prone. 
Some javaist friends of mine told me about guice so I draft this and now I use it almost every day.

All remarks are welcomed.
Please not that it's pre-alpha stage, use it if you know what you're doing



## Read tests ## 
at [test/app/guicejsTest]( test/app/guicejsTest ):

```js
        describe( 'injector', function() {

            before( function() {

                this.Dataset = Seed.extend( {

                    isDataset: true,

                    constructor: function( o ) {

                        this.rawData = o.rawData
                        this.calendar = o.calendar

                    },

                    $inject: {
                        $id: '_dataset',
                        calendar: '_calendar'
                    }

                } )

                this.Calendar = Seed.extend( {

                    isCalendar: true,

                    constructor: function( o ) {

                        this.dates = o.dates

                    },

                    $inject: {
                        $id: '_calendar'
                    }

                } )

            } )


            it( 'should be possible to create an injector', function() {

                this.injector = guicejs.createInjector( {

                    _dataset: {
                        $id: '_dataset',
                        rawData: {
                            fromInjector: true
                        }
                    },

                    _calendar: {
                        $id: '_calendar',
                        dates: [ '18022014' ]
                    }

                } )

            } )

            describe( 'data injection', function() {

                it( 'should be possible to retrieve a instance from a injector with no instance', function() {

                    this.calendar = this.injector.getInstance( '_calendar' )
                    expect( this.calendar.isCalendar ).to.be.true

                } )

                it( 'should have send the data declared in injector', function() {

                    expect( this.calendar.dates ).to.exist
                    expect( this.calendar.dates[ 0 ] ).to.equal( '18022014' )

                } )

            } )

            describe( 'instance injection', function() {


                it( 'should be possible to retrieve an instance having another @injected instance', function() {

                    this.dataset = this.injector.getInstance( '_dataset' )
                    expect( this.dataset.isDataset ).to.be.true

                } )

                it( 'shoud also have the data sent with the injector', function() {

                    expect( this.dataset.rawData.fromInjector ).to.be.true

                } )

                it( 'should have the injected instance', function() {

                    expect( this.dataset.calendar ).to.exist
                    expect( this.dataset.calendar.isCalendar ).to.be.true

                } )

                it( 'should have the injected instance with injection data', function() {

                    expect( this.dataset.calendar.dates ).to.exist
                    expect( this.dataset.calendar.dates[ 0 ] ).to.equal( '18022014' )

                } )

            } )
        })
    })
})
```

## Install ##

guicejs is developped as [AMD module](http://requirejs.org/docs/whyamd.html) but can be installed with npm, bower or old-fashioned src=".min.js".

#### With npm: ####

```
npm install https://github.com/cagosta/guicejs/tarball/master
```

and use it with nodejs: 
```
var guicejs = require('guicejs')
```

#### With bower: ####

``` 
bower install git@github.com/cagosta/guicejs
```

Point `guicejs` to `[bower_components_path]/guicejs/app/guicejs.js` into your requirejs path config 
and load it with requirejs:  

```javascript
require(['guicejs/guicejs'], function( guicejs ){

})
```


#### With src=" .min.js" ####


Inside the `dist` folder, [download latest standalone minified version](https://raw.github.com/cagosta/guicejs/master/dist/guicejs-latest-standalone-min.js) or [development version](https://raw.github.com/cagosta/guicejs/master/dist/guicejs-latest-standalone.js) and include it in your html page:

```html
<script src="[path_to_source]/guicejs-latest-standalone-min.js%>"></script>
```

The module is available via the scope 

```javascript
window.guicejs
```


## Documentation ##

See jsdoc-generated documentation in /documentation  

### Folder Structure ###

    app         ->  development files
    |- bower_components          ->  [bower](https://github.com/bower/bower) front-end packages
    |- main.js                   ->  main file for browser and node.js, handle AMD config
    |- guicejs   -> main AMD module
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


### On saucelabs ####

Beta: run your tests with saucelabs and sauce connect:  
- add your saucelabs credentials into .credentials.json 
```
{
 
    "saucelabs": {
        "username": "",
        "key": ""
    }   

}
```
- configure the browser your want your tests to run on in `config.json`  
- and run your tests with:  
```
grunt test:sauce
```


## Build your own ##

This project uses [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/) and [Require.js](http://requirejs.org/docs/optimization.html) for the build process. If for some reason you need to build a custom version install Node.js, `npm install` and run:

    grunt build

## Yeoman Mangrove module Generator ##

This module is based on a [Yeoman](https://github.com/yeoman/yeoman/wiki/Getting-Started) generator: [Generator-mangrove-module](https://github.com/cagosta/generator-mangrove-module)  
Check it for task-related references such as build, deploy etc ..


## Authors ##
* [Cyril Agosta](https://github.com/cagosta)


## License ##

[MIT License](http://www.opensource.org/licenses/mit-license.php)

