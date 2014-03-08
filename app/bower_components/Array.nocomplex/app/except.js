define( function() {

    Array.prototype.except = function( v ) {
        var res = [];
        for ( var i = 0, n = this.length; i < n; i++ )
            if ( this[ i ] !== v ) res.push( this[ i ] )
        return res;
    }

} );