define( [
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


} )