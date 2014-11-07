window.addEventListener('load', function() {
	console.log('qPub test');

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
	
}, false);
