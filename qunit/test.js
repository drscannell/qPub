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

// add event listener

QUnit.asyncTest("add one click event listener", function(assert) {
	var el, expected, observed, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	expected = 'event fired';
	observed = 'event not fired';
	q(el).on('click', function(event) {
		observed = 'event fired';
	});
	testHelper.trigger(el, 'click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: callback to fire' + 
			' within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

QUnit.asyncTest("add two click event listeners", function(assert) {
	var el, expected, observed, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	expected = 5;
	observed = 0;
	q(el).on('click', function(event) {
		observed += 2;
	});
	q(el).on('click', function(event) {
		observed += 3;
	});
	testHelper.trigger(el, 'click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: 2 incrementing callbacks' +
		 '	to fire within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

// remove event listener

QUnit.asyncTest("remove all click event listeners", function(assert) {
	var el, expected, observed, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	expected = 'event not fired';
	observed = 'event not fired';
	q(el).on('click', function(event) {
		observed = 'event fired';
	});
	q(el).on('click', function(event) {
		observed = 'event fired';
	});
	q(el).off('click');
	testHelper.trigger(el, 'click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: event handler to be' + 
			' removed within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

QUnit.asyncTest("remove named click event listeners", function(assert) {
	var el, expected, observed, handler, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	observed = 'no handlers fired!';
	expected = 'right handler fired';
	var handlerToKeep = function(event) {
		observed = 'right handler fired';
	};
	var handlerToRemove = function(event) {
		observed = 'wrong handler fired';
	};
	q(el).on('click', handlerToKeep);
	q(el).on('click', handlerToRemove);
	q(el).off('click', handlerToRemove);
	testHelper.trigger(el, 'click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: event handler to be' + 
			' removed within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

// trigger event listener

QUnit.asyncTest("trigger named click event listener", function(assert) {
	var el, expected, observed, handler, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	observed = 'no handlers fired!';
	expected = 'handler fired';
	var handler = function(event) {
		observed = 'handler fired';
	};
	q(el).on('click', handler);
	q(el).trigger('click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: event handler to be' + 
			' triggered within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

QUnit.asyncTest("trigger 3 click event listeners", function(assert) {
	var el, expected, observed, handler, DELAY=20;
	expect(1);
	el = testHelper.addElement({
		'tagname':'button'
	});
	observed = 0;
	expected = 8;
	q(el).on('click', function(){observed += 2});
	q(el).on('click', function(){observed += 2});
	q(el).on('click', function(){observed += 4});
	q(el).trigger('click');
	setTimeout(function() {
		assert.equal(observed, expected, 'Expected: 3 event handlers to be' + 
			' triggered within ' + DELAY + ' ms');
		QUnit.start();
	},DELAY);
});

// add class
// remove class
// toggle class

