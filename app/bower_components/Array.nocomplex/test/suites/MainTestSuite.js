define( [
    'Array.nocomplex/Array.nocomplex'
 ], function( ArrayNocomplex  ) {

    describe( 'Array.nocomplex/Array.nocomplex', function() {

        it( 'should load without blowing', function() {

            expect( ArrayNocomplex ).to.exist

        } )


        it( 'should return Array.prototype', function() {

            expect( ArrayNocomplex ).to.equal( Array.prototype )

        } )

        it( 'should have define Array.prototype methods', function() {

            expect( Array.prototype.map ).to.exist
            expect( Array.prototype.equals ).to.exist
            expect( [ '2', '2' ].equals( [ '2', '2' ] ) ).to.be.true
            expect( [].find ).to.exist

        } )

    } )

} )