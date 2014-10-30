/* qpub.js
 *
 * Exposes the following global variables:
 * - qpub
 * - q
 */

(function() {
	var q, find, bind, unbind
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
	unbind = function(el, eventType, callback) {
		el.removeEventListener(eventType, callback);
	};

	// Factory
	q = function(query, context) {
		return (function(query, context) {
			var els = find(query, context)
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
