/**
 * guicejs version: "0.0.3" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/guicejs for details
 */

define( [
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


} )