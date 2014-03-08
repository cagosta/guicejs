define( [ './isIn' ], function() {

    Array.prototype.equals = function( array ) {
        if ( this.isIn( array ) && array.isIn( this ) ) {
            return true;
        }
        return false;
    };


} );