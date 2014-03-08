define( function() {


    Array.prototype.eachPair = function( f ) {
        var n = this.length;
        for ( var i = 0; i < n - 1; i++ ) {
            f( this[ i ], this[ i + 1 ], i );
        }
        return this;
    };


} );