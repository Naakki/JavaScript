// Animation

function loading() {
	const start = 9;
	const end = 137;

	var ball = document.getElementById('ball');
	var ppbtn = document.getElementById('ppbtn');

	timer = setInterval(frame, 34);

	function frame() {
		if (fob == 1) {
			ball.style.left = (steps += 1) + "px";
			if (steps == end) {
				fob = 0;
			}
		} else {
			ball.style.left = (steps -= 1) + "px";
			if (steps == start) {
				fob = 1;
			}
		}
	}
}

var fob = 1;
var steps = 9;
var isStarted = false;
ppbtn.onclick = function () {
	switch (isStarted) {
		case false:
			isStarted = true;
			loading();
			break;
		case true:
			isStarted = false;
			cancelAnimationFrame(timer);
			clearInterval(timer);
			document.getElementById('ball').style.left = steps + "px";
			break;
	}
}