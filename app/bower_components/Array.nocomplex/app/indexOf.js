define( function() {


    Array.prototype.indexOf = Array.prototype.indexOf || function( s ) {
        var i, l
        for ( i = 0, l = this.length; i < l; i++ )
            if ( this[ i ] === s )
                return i
        return -1
    };

} );