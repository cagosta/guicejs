(function () {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("bower_components/almond/almond", function(){});

define( 'Seed/helpers',[],function() {


    // dirty, todo
    Function.prototype.bind || ( Function.prototype.bind = function( scope ) {

        var self = this
        return ( function() {

            return ( self.apply( scope, arguments ) )
        } )
    } )

    return {

        capitalize: function( s ) {

            return ( s.charAt( 0 ).toUpperCase() + s.slice( 1 ) )

        },

        remove: function( a, v ) {

            for ( var i = a.length; i--; ) {
                if ( a[ i ] === v ) a.splice( i, 1 )
            }
            return a

        },

        clone: function( o ) { // clones an object 

            var res = {};
            for ( var i in o )
                if ( o.hasOwnProperty( i ) ) res[ i ] = o[ i ]
            return res

        },

        extend: function( o ) {

            for ( var i = 1, n = arguments.length; i < n; i++ ) {
                var e = typeof( arguments[ i ] ) === 'object' || typeof( arguments[ i ] ) === 'function' ? arguments[ i ] : {}
                for ( var j in e )
                    if ( e.hasOwnProperty( j ) ) {
                        o[ j ] = e[ j ]
                    }
            }
            return o

        },

        find: function( a, f ) {

            for ( var i = 0, n = a.length; i < n; i++ ) {
                if ( f( a[ i ], i ) ) return a[ i ]
            }
            return false
        }

    }

} );
define( 'Seed/Extendable',[
    './helpers'
], function( _ ) {


    /**
     * This is the basic extendable element,
     *
     * @export Seed/Extendable
     *
     */

    var Extendable = function() {

    }

    Extendable._seedPlugins = []

    Extendable.getSeedPlugins = function() {

        return this._seedPlugins

    }

    Extendable.hasSeedPlugin = function( id ) {

        var plugins = this.getSeedPlugins()

        for ( var i = plugins.length; i--; ) {

            if ( plugins[ i ].getId() === id )
                return true
        }

        return false

    }


    /**
     * Initialize an object
     *
     * @this {Extendable}
     * @param {Object} configuration Object
     */

    Extendable.prototype.constructor = function() {}


    Extendable.use = function( useOptions ) {

        var attrs, Class, extension = {}, plugins, proto;

        useOptions = useOptions || {}

        plugins = useOptions.plugins ||  []

        Class = function() {

            var instanciation = arguments[ 0 ] !== false

            this.Class = Class

            if ( instanciation ) {

                Class.prototype.constructor.apply( this, arguments )
            }

        }

        attrs = _.clone( this )
        _.extend( Class, attrs )

        Class._seedPlugins = plugins

        proto = _.extend( ( new this( false ) ) )

        Class.prototype = proto

        return Class

    }


    Extendable.Class = Extendable

    Extendable.extend = function( extension ) {

        var attrs, Class, proto, plugins;

        Class = function() {

            this.Class = Class

            var instanciation = arguments[ 0 ] !== false

            if ( instanciation ) {

                Class.prototype.constructor.apply( this, arguments )
            }


        }


        attrs = _.clone( this )
        _.extend( Class, attrs )


        proto = _.extend( new this( false ), extension )


        plugins = this.getSeedPlugins()

        Class.prototype = proto;


        for ( var i = 0; i < plugins.length; i++ )
            plugins[ i ].handle( {
                extendedPrototype: this.prototype,
                Class: Class,
                extension: extension
            } )



        return Class

    }

    return Extendable

} );
define( 'mangrove-utils/extend',[],function() {

    return function( o ) {
        if ( o.prototype ) o = o.prototype;
        for ( var i = 1, n = arguments.length; i < n; i++ ) {
            var e = arguments[ i ].prototype || arguments[ i ];
            for ( var j in e )
                if ( e.hasOwnProperty( j ) ) {
                    o[ j ] = e[ j ];
                }
        }
        return o;
    };

} );
define( 'Seed/plugins/AbstractExtendHook',[
	'Seed/Extendable',
	'mangrove-utils/extend'
 ], function( Extendable, extend ) {


	/**
	 *
	 * @constructor
	 *
	 */

	return Extendable.extend( {

		constructor: function( o ) {

			this.pluginId = o.pluginId

			this.Class = o.Class
			this.newPrototype = this.getNewPrototype()
			this.extendedPrototype = o.extendedPrototype

			this.extension = o.extension

			this.confKey = 'seedPlugin'


			if ( !this.pluginInitialized() )
				this.initializePlugin()


		},

		extendNewPrototype: function( o ) {

			extend( this.getNewPrototype(), o )

		},


		pluginInitialized: function() {

			if ( !this.getNewPrototypeAttr( this.confKey ) )
				return false

			if ( !this.getNewPrototypeAttr( this.confKey )[  this.pluginId ] )
				return false

			return true
		},

		initializePlugin: function() {

			if ( !this.getNewPrototypeAttr( this.confKey ) ) {
				this.setNewPrototypeAttr( this.confKey, {} )
			}

			if ( !this.getNewPrototypeAttr( this.confKey )[  this.pluginId ] )
				this.getNewPrototypeAttr( this.confKey )[  this.pluginId ] = {}

		},

		defineNewPrototypeMethod: function( methodName, f ) {

			this.setNewPrototypeAttr( methodName, f )

		},

		getPluginConfig: function() {

			return this.getNewPrototype()[ this.confKey ][  this.pluginId ]

		},

		getPluginConfigAttr: function( key ) {

			return this.getPluginConfig()[ key ]

		},

		setPluginConfigAttr: function( key, value ) {

			this.getPluginConfig()[ key ] = value

		},

		getNewPrototype: function() {

			return this.getClass().prototype

		},

		setNewPrototypeAttr: function( key, value ) {

			return this.getNewPrototype()[ key ] = value

		},

		getNewPrototypeAttr: function( key ) {

			return this.getNewPrototype()[ key ]

		},

		getExtensionAttr: function( key ) {

			return this.getExtension()[ key ]

		},

		setExtensionAttr: function( key, value ) {

			return this.getExtension()[ key ] = value

		},


		getExtension: function() {

			return this.extension

		},

		getNewPrototype: function() {

			return this.Class.prototype

		},

		getExtendedPrototypeAttr: function( key ) {

			return this.extendedPrototype[  key ]

		},

		getExtendedPrototype: function() {

			return this.extendedPrototype

		},

		getClass: function() {

			return this.Class

		}

	} )



} );
define( 'Seed/plugins/AbstractSeedPlugin',[
    'Seed/Extendable',
    './AbstractExtendHook'
 ], function( Seed, AbstractExtendHook ) {


    /**
     *
     * @constructor
     *
     */

    return Seed.extend( {

        constructor: function() {

            this.ExtendHook = this.ExtendHook || AbstractExtendHook
            this.extendHooks = []

        },

        getId: function() {

            return this.id

        },

        handle: function( o ) {

            this.buildExtendHook( o )

        },

        buildExtendHook: function( o ) {

            o.pluginId = this.id

            var ExtendHook = this.ExtendHook,
                extendHook;

            extendHook = new ExtendHook( o )
            this.extendHooks.push( extendHook )
            this.onExtend( extendHook )

        },

        onExtend: function( extendHook ) {

        }

    } )

} );
define( 'guicejs/GuiceExtendHook',[
    'Seed/plugins/AbstractExtendHook',
    'Seed/helpers'
 ], function( AbstractExtendHook, _ ) {


    var repo = {}

    return AbstractExtendHook.extend( {

        constructor: function( o ) {



            AbstractExtendHook.prototype.constructor.apply( this, arguments )

        },

        initializePlugin: function() {

            if ( !this.hasInjection() ) // no need to add the plugin if no injection
                return

            AbstractExtendHook.prototype.initializePlugin.apply( this, arguments )

        },


        hasInjection: function() {

            return !!this.getInjection()

        },

        getInjection: function() {

            return this.getExtensionAttr( '$inject' )

        }



    } )

} );
define( 'guicejs/GuiceInjector',[
    'Seed/Extendable',
    'mangrove-utils/extend'
 ], function( Extendable, extend ) {


    return Extendable.extend( {


        constructor: function( o ) {

            this.structure = o.structure
            this.injectionRepo = o.injectionRepo

        },

        getInstance: function( instanceId ) {

            var Class = this.getBindedClass( instanceId ),
                options = this.getOptions( instanceId );

            if ( !Class )
                throw new Error( 'GuiceInjector -> Could not find a Class for ' + dataset )

            return new Class( options )

        },

        getBindedId: function( instanceId ) {

            if ( !this.getStructure( instanceId ).$id )
                throw new Error( 'GuiceInjector -> Coult not find a injector structor for ' + injectionId )

            return this.getStructure( instanceId ).$id

        },

        getBindedClass: function( instanceId ) {

            return this.getClass( this.getBindedId( instanceId ) )

        },

        getOptions: function( instanceId ) {

            var injectionOptions = this.getStructure( instanceId ),
                injectionId = this.getBindedId( instanceId ),
                injection = this.getInjection( injectionId ),
                depId,
                options;

            options = extend( {}, injectionOptions )

            for ( var injectionKey in injection )
                if ( injection.hasOwnProperty( injectionKey ) ) {
                    if (  injectionKey !== '$id' && typeof injection[ injectionKey ] === 'string' ) {
                        depId = injection[ injectionKey ]
                        options[ injectionKey ] = this.getInstance( depId )
                    }
                }

            return options

        },

        getStructure: function( id ) {

            if ( !this.structure[ id ] )
                throw new Error()

            return this.structure[ id ]

        },

        getClass: function( id ) {

            return this.getInjection( id ).Class

        },

        getInjection: function( id ) {

            var injection = this.injectionRepo[ id ]

            if ( !injection )
                throw new Error( 'GuiceInjector -> no injection found for ' + id )

            return injection

        }


    } )


} );
/**
 * guicejs version: "0.0.3" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/guicejs for details
 */

define( 'guicejs/guicejs',[
    'Seed/plugins/AbstractSeedPlugin',
    './GuiceExtendHook',
    './GuiceInjector'
], function( AbstractSeedPlugin, InjectExtendHook, GuiceInjector ) {


    /**
     *
     * @constructor
     *
     */


    var Guicejs = AbstractSeedPlugin.extend( {

        constructor: function() {

            this.id = 'guice'
            this.ExtendHook = InjectExtendHook

            this.injectors = []

            this.injectionRepo = {}

            AbstractSeedPlugin.prototype.constructor.apply( this, arguments )

        },


        createInjector: function( o ) {

            var injector = new GuiceInjector( {
                structure: o,
                injectionRepo: this.injectionRepo
            } )

            this.injectors.push( injector )

            return injector

        },


        onExtend: function( extendHook ) {

            if ( extendHook.hasInjection() )
                this.initializeInjection( extendHook )

        },

        registerInjection: function( id, injection ) {

            this.injectionRepo[ id ] = injection

        },

        initializeInjection: function( extendHook ) {

            var injection = extendHook.getInjection(),
                id = injection.$id,
                Class;

            if ( !id )
                throw new Error( 'Guicejs -> Injection should have an $id' )

            Class = extendHook.getClass()
            injection.Class = Class // is this dirty?

            this.registerInjection( id, injection )

        }

    } )


    return new Guicejs


} );
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
;
define("guicejs/main", function(){});

}());