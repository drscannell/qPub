window.addEventListener('load', function() {
	console.log('qPub test');

	console.log('touch events? ' + q.hasTouchEvents);
	console.log('local storage? ' + q.hasLocalStorage);

	if (q.hasLocalStorage) {
		var t = Date.now().toString();
		console.log(t);
		q.storage.setItem('timeTest', t);
		var result = q.storage.getItem('timeTest');
		console.log(result);
		console.log('q.storage works? ' + (t === result));
	}

	q('p').on('click', function(event) {
		q(this).toggle('red');
	});

	var paras = q('p');
	q('p').on('click', function(event) {
		q(this).toggle('bolded');
	});


	

	console.log('paras:');
	var paras = q('.para');
	for (var i = 0; i < paras.length; i++) {
		console.log(paras[i]);
	}
	console.log('mouseover to red');
	q(paras).on('mouseover', function(event) {
		event.target.style.fontStyle = 'italic';
	}).on('mouseout', function(event) {
		event.target.style.fontStyle = 'inherit';
	});

	blockquotes = q('blockquote');
	var clickCount = 0;
	blockquotes.on('click', function(event) {
		clickCount++;
		event.target.innerHTML = event.target.innerHTML + '.';
		if (clickCount > 2) {
			blockquotes.off('click');
		}
	});

	console.log(q('p').hasClass('thirdpara'));

	q('.thirdpara').addClass('bolded')
		.addClass('bolded').on('click', function(event) {
			q(this).addClass('clicked');
		});

	// removeClass
	console.log("q('.fourthpara').removeClass('remove-me');");
	console.log('before: ' + q('.fourthpara')[0].className);
	q('.fourthpara').removeClass('remove-me');
	console.log('after: ' + q('.fourthpara')[0].className);

	// toggleClass
	console.log("q('.fourthpara').toggle('remove-me');");
	console.log('before: class="' + q('.fourthpara')[0].className + '"');
	q('.fourthpara').toggle('toggle-me');
	console.log('once: class="' + q('.fourthpara')[0].className + '"');
	q('.fourthpara').toggle('toggle-me');
	console.log('twice: class="' + q('.fourthpara')[0].className + '"');
	
}, false);
