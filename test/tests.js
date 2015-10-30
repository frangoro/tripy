QUnit.asyncTest("currentEvent", function(assert) {
	expect(1);
	//QUnit.test( "setCurrentEvent test", function( assert ) {
	  assert.equal(setCurrentEvent(0),-1, "No event found so go to Event page" );
	//});
});