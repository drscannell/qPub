# qpub.js

This script is a lightweight alternative to jQuery, designed for use in eBooks.

## Features

- Search the DOM

	```
	var paras = q('p');
	```

- Add/remove/trigger event listeners

	```
	q('.button').on('click', function(event) {
		doSomething();
		q(this).off('click');
	});
	q('.button').trigger('click');
	```

- Add/remove/toggle classes

	```
	q('.sidebar').addClass('sidebar-visible');
	```

	```
	q('.sidebar').removeClass('sidebar-visible');
	```

	```
	q('.sidebar').toggle('sidebar-visible');
	```

- Detect and use local storage

	```
	if (q.hasLocalStorage) {
		var prevTimestamp = q.storage.getItem('timestamp');
		q.storage.setItem('timestamp', Date.now().toString());
	}
	```

- Detect touch events

	```
	if (q.hasTouchEvents) {
		activateSwipeEvents();
	}
	```
