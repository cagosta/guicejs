define( function() {

    Array.prototype.findByKey = function( key, value ) {
        for ( var i = 0, n = this.length; i < n; i++ ) {
            if ( this[ i ][ key ] === value ) return this[ i ];
        }
        return false;
    };

} );