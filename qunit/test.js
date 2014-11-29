QUnit.test("window.q exposed", function(assert) {
	assert.ok('q' in window, 'Expect "q" property in window object');
});

QUnit.test("find by tagname", function(assert) {
	var before, after, expected, observed;
	expected = 3;
	before = q('p').length;
	for (var i = 0; i < expected; i++) {
		testHelper.addElement({
			'tagname':'p'
		});
	}
	after = q('p').length;
	observed = after - before;
	assert.equal(observed, expected, 'Expected: ' + expected + ' results');
});

QUnit.test("find by id", function(assert) {
	var before, after, expected, observed;
	expected = 1;
	before = q('#findme').length;
	for (var i = 0; i < expected; i++) {
		testHelper.addElement({
			'tagname':'p',
			'idval':'findme'
		});
	}
	after = q('#findme').length;
	observed = after - before;
	assert.equal(observed, expected, 'Expected: ' + expected + ' results');
});

QUnit.test("find by class", function(assert) {
	var before, after, expected, observed;
	expected = 3;
	before = q('.findme').length;
	testHelper.addElement({
		'tagname':'p',
		'classname':'findme'
	});
	testHelper.addElement({
		'tagname':'div',
		'classname':'findme'
	});
	testHelper.addElement({
		'tagname':'a',
		'classname':'findme'
	});
	after = q('.findme').length;
	observed = after - before;
	assert.equal(observed, expected, 'Expected: ' + expected + ' results');
});

QUnit.test("find by tagname & class", function(assert) {
	var before, after, expected, observed;
	expected = 1;
	before = q('div.findme').length;
	testHelper.addElement({
		'tagname':'p',
		'classname':'para findme fuzz'
	});
	testHelper.addElement({
		'tagname':'div',
		'classname':'div findme static'
	});
	testHelper.addElement({
		'tagname':'a',
		'classname':'findme'
	});
	after = q('div.findme').length;
	observed = after - before;
	assert.equal(observed, expected, 'Expected: ' + expected + ' results');
});

QUnit.asyncTest("add click event listener", function(assert) {
	var el, isFired, DELAY;
	expect(1);
	DELAY = 100; // ms
	el = testHelper.addElement({
		'tagname':'button'
	});
	isFired = false;
	q(el).on('click', function(event) {
		isFired = true;
		assert.ok(true, 'callback successfully fired');
		QUnit.start();
	});
	testHelper.trigger(el, 'click');
	setTimeout(function() {
		if (!isFired) assert.ok(false, 'callback failed to fire' +
			' within ' + DELAY + ' ms');
	},DELAY);
});



