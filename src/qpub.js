/* qpub.js
 *
 * Exposes the following global variables:
 * - qpub
 * - q
 */

(function() {
	var q, find, executeQuery, 
		bind, unbind, 
		doAnyHaveClass, hasClass,getClasses,
		qsa='querySelectorAll' in document;

	// DOM searching
	if (qsa) {
		find = function(query, context) {

			var found = new Array();
			context = context || document;

			// query string
			if (typeof query === 'string') {
				found = executeQuery(query, context);

			// results array
			} else if (Array.isArray(query)) {
				for (var i = 0; i < query.length; i++) {
					if (typeof query === 'string') {
						found = found.concat(executeQuery(query, context));
					} else if (query[i].nodeType) {
						found.push(query[i]);
					}
				}
			}
			return found;
		};
	} else {
		console.error('document.querySelectorAll unavailable');
	}

	executeQuery = function(query, context) {
		var found = [];
		var _found = context.querySelectorAll(query);
		for (var i = 0; i < _found.length; i++) {
			found.push(_found[i]);
		}
		return found;
	};
	

	// Event listener binding
	var events = {};
	bind = function(el, eventType, callback) {
		if (!events.hasOwnProperty(el)) {
			events[el] = {};
		}
		if (!events[el].hasOwnProperty(eventType)) {
			events[el][eventType] = [];
		}
		events[el][eventType].push(callback);
		el.addEventListener(eventType, callback, false);
	};
	unbind = function(el, eventType, callback) {
		if (callback) {
			el.removeEventListener(eventType, callback);
		} else if (events.hasOwnProperty(el)) { 
			if (events[el].hasOwnProperty(eventType)) {
				var handlers = events[el][eventType];
				for (var i = 0; i < handlers.length; i++) {
					el.removeEventListener(eventType, handlers[i]);
				}
			}
		}
	};

	doAnyHaveClass = function(classname, els) {
		for (var i = 0; i < els.length; i++) {
			console.log('tic');
			if (hasClass(classname, els[i])) {
				return true;
			}
		}
		return false;
	};
	hasClass = function(classname, el) {
		var classnames = getClasses(el);
		for (var i = 0; i < classnames.length; i++) {
			if (classnames[i] === classname) {
				return true;
			}
		}
		return false;
	};
	getClasses = function(el) {
		if (el.className) {
			return el.className.split(' ');
		}
		return [];
	};

	// Factory
	q = function(query, context) {
		return (function(query, context) {
			var els = find(query, context);
			els.on = function(eventType, callback) {
				for (var i = 0; i < els.length; i++) {
					bind(els[i], eventType, callback);
				}
				return this;
			};
			els.off = function(eventType, callback) {
				for (var i = 0; i < els.length; i++) {
					unbind(els[i], eventType, callback);
				}
				return this;
			};
			els.hasClass = function(classname) {
				return doAnyHaveClass(classname, els);
			};
			return els;
		})(query, context);
	};

	// Expose global variables
	if ('q' in window) {
		console.error('qpub.js conflict: window.q already defined. ' +
				'Exposing window.qpub instead.');
		window.qpub = q;
	} else {
		window.q = q;
	}

})();
