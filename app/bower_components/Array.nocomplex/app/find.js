define( function() {

  Array.prototype.find = function( f ) {
    for ( var i = 0, n = this.length; i < n; i++ ) {
      if ( f( this[ i ], i ) ) return this[ i ];
    }
    return false;
  };

  Array.prototype.findReverse = function( f ) {
    for ( var i = this.length; i--; ) {
      if ( f( this[ i ], i ) ) return this[ i ];
    }
    return false;
  };

} );