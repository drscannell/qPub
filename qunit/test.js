
QUnit.test("window.q exposed", function(assert) {
	assert.ok('q' in window, 'Expect "q" property in window object');
});

QUnit.test("find by tagname", function(assert) {
	var fixture = document.getElementById('qunit-fixture');
	fixture.appendChild(document.createElement('blink'));
	fixture.appendChild(document.createElement('blink'));
	fixture.appendChild(document.createElement('blink'));
	var blinks = q('blink');
	assert.equal(blinks.length, 3, 'Expected: 3 results');
});

QUnit.test("find by id", function(assert) {
	var fixture = document.getElementById('qunit-fixture');
	var blink = document.createElement('blink');
	blink.setAttribute('id', 'findme');
	fixture.appendChild(blink);
	var blinks = q('#findme');
	assert.equal(blinks.length, 1, 'Expected: 3 results');
});
