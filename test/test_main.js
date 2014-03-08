'use strict'

if ( typeof window === 'undefined' )
    global.requirejs = require( 'requirejs' )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname + '/../app': '../app'}(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        guicejs: '.',
        test: '../test',
        sinonjs: 'bower_components/sinonjs/sinon',
        'sinon-chai': 'bower_components/sinon-chai/lib/sinon-chai',
        async: 'bower_components/requirejs-plugins/src/async',
        depend: 'bower_components/requirejs-plugins/src/depend',
        font: 'bower_components/requirejs-plugins/src/font',
        goog: 'bower_components/requirejs-plugins/src/goog',
        image: 'bower_components/requirejs-plugins/src/image',
        json: 'bower_components/requirejs-plugins/src/json',
        mdown: 'bower_components/requirejs-plugins/src/mdown',
        noext: 'bower_components/requirejs-plugins/src/noext',
        propertyParser: 'bower_components/requirejs-plugins/src/propertyParser',
        'Markdown.Converter': 'bower_components/requirejs-plugins/lib/Markdown.Converter',
        text: 'bower_components/requirejs-plugins/lib/text',
        requirejs: 'bower_components/requirejs/require',
        mocha: 'bower_components/mocha/mocha',
        'mangrove-utils': 'bower_components/mangrove-utils/app',
        'chai-as-promised': 'bower_components/chai-as-promised/lib/chai-as-promised',
        chai: 'bower_components/chai/chai',
        almond: 'bower_components/almond/almond',
        'Array.nocomplex': 'bower_components/Array.nocomplex/app',
        Seed: 'bower_components/Seed/app'
    }
} )

requirejs( [ 'test/TestRunner' ], function( TestRunner ) {

    new TestRunner()

} )