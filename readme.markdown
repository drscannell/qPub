# qpub.js

This script is a lightweight alternative to jQuery, designed for use in eBooks.

## Features

- Search the DOM

	```
	var paras = q('p');
	```

- Add/remove event listeners

	```
	q('.button').on('click', function(event) {
		doSomething();
	});
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

- Use local storage

	```
	if (q.hasLocalStorage) {
		var prevTimestamp = q.storage.getItem('timestamp');
		q.storage.setItem('timestamp', Date.now().toString());
	}
	```

- Detect features

	```
	if (q.hasTouchEvents) {
		if (q.hasLocalStorage) {
			if (q.hasAjax) {

			}
		}
	}
	```
