var qPub;
(function(q) {
	var find, bind, 
	qsa='querySelectorAll' in document;

	// DOM searching
	if (qsa) {
		find = function(query, context) {
			var found = new Array();
			context = context || document;
			var _found = context.querySelectorAll(query);
			for (var i = 0; i < _found.length; i++) {
				found.push(_found[i]);
			}
			return found;
		};
	} else {
		throw Error('oops');
	}
	// Event listener binding
	bind = function(el, eventType, callback) {
		el.addEventListener(eventType, callback, false);
	};

	q = function(query, context) {
		return (function(query, context) {
			var els = find(query, context)
			els.on = function(eventType, callback) {
				for (var i = 0; i < els.length; i++) {
					bind(els[i], eventType, callback);
				}
				return this;
			};
			return els;
		})(query, context);
	};

	window.q = q;

})(qPub);
