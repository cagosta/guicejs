define( [ './has' ], function() {


    Array.prototype.isIn = function( array ) {
        for ( var i = this.length; i--; ) {
            if ( !array.has( this[ i ] ) ) return false;
        }
        return true;
    }

} );