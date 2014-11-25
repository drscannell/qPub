var testHelper = {};
testHelper.fixture = document.getElementById('qunit-fixture');

testHelper.trigger = function(el, eventType){
	/* http://goo.gl/jTDKmf
	 */
  if (el.fireEvent) {
    el.fireEvent('on' + eventType);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(eventType, true, false);
    el.dispatchEvent(evObj);
  }
}

testHelper.addElement = function(options) {
	options = options || {};
	var tagname = options.tagname || 'div';
	var classname = options.classname || null;
	var idval = options.idval || null;
	var addTo = options.addTo || testHelper.fixture;
	var el = document.createElement(tagname);
	if (classname) el.setAttribute('class', classname);
	if (idval) el.setAttribute('id', idval);
	addTo.appendChild(el);
};

QUnit.test("window.q exposed", function(assert) {
	assert.ok('q' in window, 'Expect "q" property in window object');
});

QUnit.test("find by tagname", function(assert) {
	testHelper.fixture.appendChild(document.createElement('blink'));
	testHelper.fixture.appendChild(document.createElement('blink'));
	testHelper.fixture.appendChild(document.createElement('blink'));
	var blinks = q('blink');
	assert.equal(blinks.length, 3, 'Expected: 3 results');
});

QUnit.test("find by id", function(assert) {
	testHelper.addElement({
		'tagname':'blink',
		'idval':'findme'
	});
	var blinks = q('#findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.test("find by class", function(assert) {
	var blink = document.createElement('blink');
	blink.setAttribute('class', 'something findme something-else');
	testHelper.fixture.appendChild(blink);
	var blinks = q('.findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.test("find by tagname & class", function(assert) {
	var blink = document.createElement('blink');
	blink.setAttribute('class', 'something findme something-else');
	testHelper.fixture.appendChild(blink);
	var rt = document.createElement('rt');
	blink.setAttribute('class', 'something findme something-else');
	testHelper.fixture.appendChild(blink);
	var blinks = q('blink.findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.asyncTest("add event listener", function(assert) {
	expect(1);
	var blink = document.createElement('blink');
	testHelper.fixture.appendChild(blink);
	var fired = false;
	q(blink).on('click', function(event) {
		fired = true;
		assert.ok(true, 'callback successfully fired');
		QUnit.start();
	});
	testHelper.trigger(blink, 'click');
	setTimeout(function() {
		if (!fired) assert.ok(false, 'callback never fired');
	},100);
});



