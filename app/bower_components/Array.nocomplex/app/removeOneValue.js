define( function() {

    Array.prototype.removeOneValue = function( v ) {
        for ( var i = this.length; i--; ) {
            if ( this[ i ] === v ) {
                return ( this.splice( i, 1 ) );
            }
        }
    };

} );