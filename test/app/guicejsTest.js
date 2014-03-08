define( [
    'guicejs/guicejs',
    'Seed/Extendable'
], function( guicejs, Extendable ) {


    describe( 'guicejs', function() {

        var Seed

        it( 'should be posssible to register guicejs as a seed plugin', function() {

            Seed = Extendable.use( {
                plugins: [ guicejs ]
            } )

            expect( Seed.hasSeedPlugin( 'guice' ) ).to.be.true

        } )

        describe( 'injector', function() {

            before( function() {

                this.Dataset = Seed.extend( {

                    isDataset: true,

                    constructor: function( o ) {

                        this.rawData = o.rawData
                        this.calendar = o.calendar

                    },

                    $inject: {
                        $id: '_dataset',
                        calendar: '_calendar'
                    }

                } )

                this.Calendar = Seed.extend( {

                    isCalendar: true,

                    constructor: function( o ) {

                        this.dates = o.dates

                    },

                    $inject: {
                        $id: '_calendar'
                    }

                } )

            } )


            it( 'should be possible to create an injector', function() {

                this.injector = guicejs.createInjector( {

                    _dataset: {
                        $id: '_dataset',
                        rawData: {
                            fromInjector: true
                        }
                    },

                    _calendar: {
                        $id: '_calendar',
                        dates: [ '18022014' ]
                    }

                } )

            } )

            describe( 'data injection', function() {

                it( 'should be possible to retrieve a instance from a injector with no instance', function() {

                    this.calendar = this.injector.getInstance( '_calendar' )
                    expect( this.calendar.isCalendar ).to.be.true

                } )

                it( 'should have send the data declared in injector', function() {

                    expect( this.calendar.dates ).to.exist
                    expect( this.calendar.dates[ 0 ] ).to.equal( '18022014' )

                } )

            } )

            describe( 'instance injection', function() {


                it( 'should be possible to retrieve an instance having another @injected instance', function() {

                    this.dataset = this.injector.getInstance( '_dataset' )
                    expect( this.dataset.isDataset ).to.be.true

                } )

                it( 'shoud also have the data sent with the injector', function() {

                    expect( this.dataset.rawData.fromInjector ).to.be.true

                } )

                it( 'should have the injected instance', function() {

                    expect( this.dataset.calendar ).to.exist
                    expect( this.dataset.calendar.isCalendar ).to.be.true

                } )

                it( 'should have the injected instance with injection data', function() {

                    expect( this.dataset.calendar.dates ).to.exist
                    expect( this.dataset.calendar.dates[ 0 ] ).to.equal( '18022014' )

                } )

            } )

            describe( 'another instance injection', function() {



                it( 'should be possible to create another injector', function() {

                    this.Dataset = Seed.extend( {


                        isDataset: true,

                        constructor: function( o ) {

                            this.rawData = o.rawData
                            this.cal = o.cal

                        },

                        $inject: {
                            $id: '_dataset',
                            cal: '_calendar'
                        }

                    } )

                    this.Calendar = Seed.extend( {

                        isCalendar: true,

                        constructor: function( o ) {

                            this.dates = o.dates

                        },

                        $inject: {
                            $id: '_calendar'
                        }

                    } )

                    this.AnotherCalendar = this.Calendar.extend( {

                        isAnotherCalendar: true,

                        $inject: {
                            $id: '_anotherCalendar'
                        }

                    } )


                    this.injector = guicejs.createInjector( {

                        _dataset: {
                            $id: '_dataset',
                            rawData: {
                                fromInjector: true
                            }
                        },

                        _calendar: {
                            $id: '_anotherCalendar',
                            dates: [ '18022014' ]
                        }

                    } )

                } )


                it( 'should be possible to retrieve an instance having another @injected instance', function() {

                    this.dataset = this.injector.getInstance( '_dataset' )
                    expect( this.dataset.isDataset ).to.be.true

                } )

                it( 'shoud also have the data sent with the injector', function() {

                    expect( this.dataset.rawData.fromInjector ).to.be.true

                } )

                it( 'should have the injected instance', function() {

                    expect( this.dataset.cal ).to.exist
                    expect( this.dataset.cal.isAnotherCalendar ).to.be.true

                } )

                it( 'should have the injected instance with injection data', function() {

                    expect( this.dataset.cal.dates ).to.exist
                    expect( this.dataset.cal.dates[ 0 ] ).to.equal( '18022014' )

                } )

            } )


        } )


    } )

} )