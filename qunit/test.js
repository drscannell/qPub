var fixture = document.getElementById('qunit-fixture');

var trigger = function(el, eventType){
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

QUnit.test("window.q exposed", function(assert) {
	assert.ok('q' in window, 'Expect "q" property in window object');
});

QUnit.test("find by tagname", function(assert) {
	fixture.appendChild(document.createElement('blink'));
	fixture.appendChild(document.createElement('blink'));
	fixture.appendChild(document.createElement('blink'));
	var blinks = q('blink');
	assert.equal(blinks.length, 3, 'Expected: 3 results');
});

QUnit.test("find by id", function(assert) {
	var blink = document.createElement('blink');
	blink.setAttribute('id', 'findme');
	fixture.appendChild(blink);
	var blinks = q('#findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.test("find by class", function(assert) {
	var blink = document.createElement('blink');
	blink.setAttribute('class', 'something findme something-else');
	fixture.appendChild(blink);
	var blinks = q('.findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.test("find by tagname & class", function(assert) {
	var blink = document.createElement('blink');
	blink.setAttribute('class', 'something findme something-else');
	fixture.appendChild(blink);
	var rt = document.createElement('rt');
	blink.setAttribute('class', 'something findme something-else');
	fixture.appendChild(blink);
	var blinks = q('blink.findme');
	assert.equal(blinks.length, 1, 'Expected: 1 result');
});

QUnit.asyncTest("add event listener", function(assert) {
	expect(1);
	var blink = document.createElement('blink');
	fixture.appendChild(blink);
	var fired = false;
	q(blink).on('click', function(event) {
		fired = true;
		assert.ok(true, 'callback successfully fired');
		QUnit.start();
	});
	trigger(blink, 'click');
	setTimeout(function() {
		if (!fired) assert.ok(false, 'callback never fired');
	},100);
});


