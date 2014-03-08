define( function() {

    Array.prototype.onEls = function( f ) {
        for ( var i = this.length; i--; ) this[ i ] = f( this[ i ], i );
        return this;
    };

} );