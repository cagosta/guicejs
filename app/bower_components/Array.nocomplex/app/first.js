define( function() {

    Array.prototype.first = function( f ) {
        for ( var i = 0, n = this.length; i < n; i++ ) {
            if ( f( this[ i ] ) ) return this[ i ];
        }
        return null;
    };

} );