define( function() {

    Array.isArray = Array.isArray || function( o ) {
        return Object.prototype.toString.call( o ) == "[object Array]"
    }

    return Array.isArray

} )