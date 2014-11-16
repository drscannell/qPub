window.addEventListener('load', function() {
	console.log('qPub test');

	console.log('local storage? ' + q.hasLocalStorage());

	console.log('paras:');
	var paras = q('.para');
	console.log(paras);
	for (var i = 0; i < paras.length; i++) {
		console.log(paras[i]);
	}
	q(paras).on('mouseover', function(event) {
		event.target.style.color = 'red';
	}).on('mouseout', function(event) {
		event.target.style.color = 'inherit';
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
