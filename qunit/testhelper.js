var testHelper = {};
(function(t) {

	t.fixture = document.getElementById('qunit-fixture');

	t.trigger = function(el, eventType){
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

	t.addElement = function(options) {
		options = options || {};
		var tagname = options.tagname || 'div';
		var classname = options.classname || null;
		var idval = options.idval || null;
		var addTo = options.addTo || testHelper.fixture;
		var el = document.createElement(tagname);
		if (classname) el.setAttribute('class', classname);
		if (idval) el.setAttribute('id', idval);
		addTo.appendChild(el);
		return el;
	};
})(testHelper);

console.log(testHelper);
