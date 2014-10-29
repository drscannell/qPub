window.addEventListener('load', function() {
	console.log('qPub test');

	console.log('paras:');
	var paras = q('.para');
	console.log(paras);
	for (var i = 0; i < paras.length; i++) {
		console.log(paras[i]);
	}
	paras.on('mouseover', function(event) {
		event.target.style.color = 'red';
	}).on('mouseout', function(event) {
		event.target.style.color = 'inherit';
	});

	blockquotes = q('blockquote');
	blockquotes.on('click', function(event) {
		event.target.innerHTML = event.target.innerHTML + '.';
	});
	
}, false);
