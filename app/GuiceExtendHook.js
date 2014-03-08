define( [
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

} )