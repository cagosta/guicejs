define( function() {


    Array.prototype.map = Array.prototype.map || function( fn, scope ) {
        if ( scope ) fn = fn.bind( scope );
        var r = this.slice();
        if ( typeof( fn ) === 'function' ) {
            for ( var i = 0, n = r.length; i < n; i++ ) r[ i ] = fn( r[ i ], i );
        } else {
            fn = fn.substr( 2, fn.length );
            for ( var i = 0, n = r.length; i < n; i++ ) r[ i ] = r[ i ][ fn ]();
        }
        return r;
    };


} );