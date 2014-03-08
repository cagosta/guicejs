define( function() {

    Array.prototype.findIndexOf = function( f ) {
        for ( var i = 0, n = this.length; i < n; i++ ) {
            if ( f( this[ i ], i ) ) return i;
        }
        return false;
    };


} );