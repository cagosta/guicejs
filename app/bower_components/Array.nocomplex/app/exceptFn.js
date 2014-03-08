define( function() {

    Array.prototype.exceptFn = function( f ) {
        var r = this.slice();
        for ( var i = r.length; i--; )
            if ( f( r[ i ] ) ) r.splice( i, 1 );
        return r;
    }

} );