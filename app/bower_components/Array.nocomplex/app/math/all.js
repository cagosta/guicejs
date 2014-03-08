define( function() {

    var methods = {

        equals: function( a ) {
            for ( var i = this.length; i--; )
                if ( a[ i ] !== this[ i ] ) return false;
            return true;
        },

        multiply: function( a ) {
            var ret = [];
            if ( typeof( a ) === 'number' ) {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] * a;
                }
            } else {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] * a[ i ];
                }
            }
            return ( ret );
        },

        divide: function( a ) {
            var ret = [];
            if ( typeof( a ) === 'number' ) {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] / a;
                }
            } else {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] / a[ i ];
                }
            }
            return ( ret );
        },

        min: function( f ) {
            var r = f ? this.map( f ) : this
            return Math.min.apply( null, r )
        },

        minMax: function( f ) {
            return [ this.min( f ), this.max( f ) ]
        },

        max: function( f ) {
            var r = f ? this.map( f ) : this
            return Math.max.apply( null, r )
        },

        average: function() {
            var ave = 0;
            for ( var i = this.length; i--; ) {
                ave += this[ i ]
            }
            return ave / this.length
        },

        minus: function( a ) {
            var ret = [];
            if ( typeof( a ) === 'number' ) {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] - a;
                }
            } else {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] - a[ i ];
                }
            }
            return ( ret );
        },

        domain: function( bounds, range ) {
            var min = range && typeof range[ 0 ] === "number" ? range[ 0 ] : this.min(),
                max = range && typeof range[ 1 ] === "number" ? range[ 1 ] : this.max(),
                a, b;
            if ( min === max ) { // if all data are equal, return range[ 0 ]
                return this.map( function() { 
                    return bounds[ 0 ]
                } )
            }
            a = ( bounds[ 1 ] - bounds[ 0 ] ) / ( max - min );
            b = ( bounds[ 0 ] * max - bounds[ 1 ] * min ) / ( max - min )
            return this.multiply( a ).add( b )
        },

        add: function( a ) {
            var ret = [];
            if ( typeof( a ) === 'number' ) {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] + a;
                }
            } else {
                for ( var i = this.length; i--; ) {
                    ret[ i ] = this[ i ] + a[ i ];
                }
            }
            return ( ret );
        },

        round: function() {
            for ( var i = this.length; i--; ) {
                this[ i ] = Math.round( this[ i ] );
            }
            return ( this );
        },

        sum: function( f ) {
            var r = 0
            for ( var i = this.length; i--; ) {
                r += f( i )
            }
            return r
        },

        orth: function() {
            if ( this.length != 2 ) {
                throw Error;
            }
            return [ -this[ 1 ], this[ 0 ] ];
        },

        norm: function() {
            return Math.sqrt( this.sum( function( i ) {
                return i * i
            } ) );
        }

    };

    for ( var method in methods )
        if ( methods.hasOwnProperty( method ) )
            Array.prototype[  method ] = methods[ method ]


    return Array.prototype
    
} )