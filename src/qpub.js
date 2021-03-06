/* qpub.js
 *
 * Exposes the following global variables:
 * - qpub
 * - q
 */

(function() {
	var q, queryObject, find, executeQuery, bind, unbind, trigger,
		doAnyHaveClass, hasClass,getClasses, addClass, removeClass, 
		toggleClass, hasLocalStorage, storage,
		qsa='querySelectorAll' in document;

	// Feature Detection
	hasTouchEvents = 'ontouchstart' in window;
	hasLocalStorage = (function() {
		if ('localStorage' in window) {
			if ('setItem' in window.localStorage && 
				'getItem' in window.localStorage) {
				var t = Date.now().toString();
				localStorage.setItem(t,t);
				return t === localStorage.getItem(t);
			}
		}
		return false;
	})();

	// Local Storage Proxy
	storage = {};
	storage.setItem = function(key, val) {
		if (hasLocalStorage) {
			localStorage.setItem(key, val);
		} else {
			console.error('HTML5 Local Storage unsupported in this environment');
		}
	};
	storage.getItem = function(key) {
		if (hasLocalStorage) {
			return localStorage.getItem(key);
		} else {
			console.error('HTML5 Local Storage unsupported in this environment');
		}
	};

	// DOM searching
	if (qsa) {
		find = function(query, context) {

			var found = new Array();
			context = context || document;

			// query string
			if (typeof query === 'string') {
				found = executeQuery(query, context);

			// results array
			} else if (Array.isArray(query) || 'isQueryObject' in query) {
				for (var i = 0; i < query.length; i++) {
					if (typeof query === 'string') {
						found = found.concat(executeQuery(query, context));
					} else if (query[i].nodeType) {
						found.push(query[i]);
					}
				}
			// DOM node
			} else if ('nodeType' in query && query.nodeType === 1) {
				found.push(query);
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
	trigger = function(el, eventType){
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

	doAnyHaveClass = function(classname, els) {
		for (var i = 0; i < els.length; i++) {
			if (hasClass(classname, els[i])) {
				return true;
			}
		}
		return false;
	};
	hasClass = function(classname, el) {
		var classnames = getClasses(el);
		return classnames.indexOf(classname) > -1;
	};
	getClasses = function(el) {
		if (el.className) {
			return el.className.split(' ');
		}
		return [];
	};
	addClass = function(classname, el) {
		var classnames = getClasses(el);
		if (classnames.indexOf(classname) === -1) {
			classnames.push(classname);
			el.className = classnames.join(' ');
		}
	};
	removeClass = function(classname, el) {
		var classnames = getClasses(el);
		var i = classnames.indexOf(classname);
		if (i > -1) {
			classnames.splice(i, 1);
			el.className = classnames.join(' ');
		}
	};
	toggleClass = function(classname, el) {
		if (hasClass(classname, el)) {
			removeClass(classname, el);
		} else {
			addClass(classname, el);
		}
	};

	/* queryObject
	 * This is the prototype for objects
	 * returned by querying the DOM via
	 * the q object
	 */
	queryObject = new Array();
	queryObject.isQueryObject = true;
	queryObject.find = function(query, context) {
		var arr = find(query, context);
		for (var i = 0; i < arr.length; i++) {
			this.push(arr[i]);
		}
		return this;
	};
	queryObject.on = function(eventType, callback) {
		for (var i = 0; i < this.length; i++) {
			bind(this[i], eventType, callback);
		}
		return this;
	};
	queryObject.off = function(eventType, callback) {
		for (var i = 0; i < this.length; i++) {
			unbind(this[i], eventType, callback);
		}
		return this;
	};
	queryObject.trigger = function(eventType) {
		for (var i = 0; i < this.length; i++) {
			trigger(this[i], eventType);
		}
	};
	queryObject.hasClass = function(classname) {
		return doAnyHaveClass(classname, this);
	};
	queryObject.addClass = function(classname) {
		for (var i = 0; i < this.length; i++) {
			addClass(classname, this[i]);
		}
		return this;
	};
	queryObject.removeClass = function(classname) {
		for (var i = 0; i < this.length; i++) {
			removeClass(classname, this[i]);
		}
		return this;
	};
	queryObject.toggle = function(classname) {
		for (var i = 0; i < this.length; i++) {
			toggleClass(classname, this[i]);
		}
		return this;
	};

	// global object
	q = function(query, context) {
		return Object.create(queryObject).find(query, context);
	};
	q.hasTouchEvents = hasTouchEvents;
	q.hasLocalStorage = hasLocalStorage;
	q.storage = storage;

	// Expose global variables
	if ('q' in window) {
		console.error('qpub.js conflict: window.q already defined. ' +
				'Exposing window.qpub instead.');
		window.qpub = q;
	} else {
		window.q = q;
	}

})();
