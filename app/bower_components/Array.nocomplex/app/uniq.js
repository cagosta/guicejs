define( [ './has' ], function() {

    Array.prototype.uniq = function( f ) {
        if ( !f ) {
            var res = []
            for ( var i = this.length; i--; ) {
                !res.has( this[ i ] ) && res.push( this[ i ] );
            }
            return res;
        } else {
            var res = [],
                _r = [];
            for ( var i = 0, n = this.length; i < n; i++ ) {
                var v = f( this[ i ] );
                if ( !_r.has( v ) ) {
                    res.push( this[ i ] )
                    _r.push( v );
                }
            }
            return res;
        }
    }

} );