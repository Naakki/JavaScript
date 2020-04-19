// Color clock

const clock = document.getElementById('clock');
const time = document.getElementById('time');
const colorCode = document.getElementById('colorCode');

setInterval(function() {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if (hours < 10) {hours = '0' + hours;}
	if (minutes < 10) {minutes = '0' + minutes;}
	if (seconds < 10) {seconds = '0' + seconds;}

	time.innerHTML = hours + ':' + minutes + ':' + seconds;
	colorCode.innerHTML = '#' + hours + minutes + seconds;
	clock.style.background = '#' + hours + minutes + seconds;
}, 1000);
