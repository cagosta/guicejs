var EngineDetector = function() {
    this.isNode = false
    this.isBrowser = false
    this.isUnknown = false
    this._exports
    this.detect()
}

EngineDetector.prototype = {

    detect: function() {
        if ( typeof module !== 'undefined' && module.exports )
            this._setAsNode()
        else if ( typeof window !== "undefined" )
            this._setAsBrowser()
        else
            this._setAsUnknown()
    },

    _setAsNode: function() {
        this.isNode = true
        this.name = 'node'
    },

    _setAsBrowser: function() {
        this.isBrowser = true
        this._global = window
        this.name = 'browser'
    },

    _setAsUnknown: function() {
        this.isUnknown = true
        this.name = 'unknown'
    },

    setGlobal: function( e ) {
        this._global = e
    },

    ifNode: function( f ) {
        if ( this.isNode )
            f()
    },

    ifBrowser: function( f ) {
        if ( this.isBrowser )
            f()
    },


    exports: function( key, exported ) {
        if ( this.isNode ) {
            this._global.exports = exported
        } else if ( this.isBrowser )
            this._global[  key ] = exported
    },

}

var engine = new EngineDetector()


var baseUrl, requirejs;

engine.ifNode( function() {

    baseUrl = __dirname
    requirejs = require( 'requirejs' )
    engine.setGlobal( module )

} )

engine.ifBrowser( function() {
    baseUrl = '.'
} )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname: '.'}(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        guicejs: '.',
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


var isStandalone = !! requirejs._defined,
    synchronous = isStandalone

engine.ifNode(function(){

    synchronous = true

})

if ( synchronous ) { // case standalone

    var guicejs = requirejs( 'guicejs/guicejs' )

    engine.exports( 'guicejs', guicejs )


} else {

    requirejs( [ 'guicejs/guicejs' ], function( guicejs ) {
        engine.exports( 'guicejs', guicejs )
    } )

}
