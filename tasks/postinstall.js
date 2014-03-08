module.exports = function( grunt ) {


    grunt.registerTask( 'postinstall', [ 'inject_rjsconfig', 'make_test_files', 'test:all' ] )


}