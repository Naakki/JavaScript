// Snake
// body {overflow: hidden;} -- css, to cancel scroll 
// finish & upgrade delayCount()

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;

canvas.width = 400;
canvas.height = 400;

let gameTimer;
let gameOverTimer;
let isGameStarted = true;
let direction = 'up';
let score = 0;
let food = {
	x: Math.floor(Math.random() * canvas.width / box) * box,
	y: Math.floor(Math.random() * canvas.height / box) * box
};

let snake = [
	{
		x: canvas.width / box / 2 * box,
		y: canvas.height / box / 2 * box
	},
	{
		x: canvas.width / box / 2 * box,
		y: (canvas.height / box / 2 + 1) * box
	},
	{
		x: canvas.width / box / 2 * box,
		y: (canvas.height / box / 2 + 2) * box
	}
];

function drawGrid() {
	ctx.strokeStyle = '#ccc';
	for (let i = box; i <= canvas.width; i += box) {
		ctx.beginPath();
		// vertical
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
		ctx.stroke();
		// horizontal
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
		ctx.stroke();
	}
}

function drawGame() {
	clearInterval(gameOverTimer);
	document.getElementById('scores').innerText = "Scores: " + score;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();

	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, box, box);
	
	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {	
			ctx.fillStyle = '#336633';
		} else {
			ctx.fillStyle = '#33cc33';
		}
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor(Math.random() * canvas.width / box) * box,
			y: Math.floor(Math.random() * canvas.height / box) * box
		};
	} else {
		snake.pop();
	}

	if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height) {
		clearInterval(gameTimer);
		gameOverTimer = setInterval(gameOver, 34);
	}

	for (let i = 1; i < snake.length; i++) {
		if (snakeX == snake[i].x && snakeY == snake[i].y) {
			clearInterval(gameTimer);
			gameOverTimer = setInterval(gameOver, 34);
		}
		if (snake[i].x == food.x && snake[i].y == food.y) {
			food = {
				x: Math.floor(Math.random() * canvas.width / box) * box,
				y: Math.floor(Math.random() * canvas.height / box) * box
			};
		}
	}

	switch (direction) {
		case 'up':
			snakeY -= box;
			break;
		case 'right':
			snakeX += box;
			break;
		case 'down':
			snakeY += box;
			break;
		case 'left':
			snakeX -= box;
			break;
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	snake.unshift(newHead);
}

function gameOver() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let grad = ctx.createLinearGradient(50, 200, canvas.width, 250);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(1, 'blue');

	ctx.fillStyle = grad;

	ctx.font = '50px Georgia';
	ctx.fillText('Game Over', 80, canvas.height / 2);
}

function delayCount() {
	let grad = ctx.createLinearGradient(50, 200, canvas.width, 250);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(1, 'blue');

	ctx.fillStyle = grad;
	ctx.font = '50px Georgia';

	setTimeout(function () {
		console.log(3);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText('3', canvas.width / 2, canvas.height / 2);
	}, 1000);
	setTimeout(function () {
		console.log(2);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText('2', canvas.width / 2, canvas.height / 2);
	}, 2000);
	setTimeout(function () {
		console.log(1);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText('1', canvas.width / 2, canvas.height / 2);
	}, 3000);
	setTimeout(function () {
		console.log('go');
		gameTimer = setInterval(drawGame, 200);	
	}, 4000);
}

document.addEventListener('keydown', function(e) {
	if ((e.keyCode == 37 || e.keyCode == 65) && direction != 'right') {
		direction = 'left';
	} else if ((e.keyCode == 38 || e. keyCode == 87) && direction != 'down') {
		direction = 'up';
	} else if ((e.keyCode == 39 || e.keyCode == 68) && direction != 'left') {
		direction = 'right';
	} else if ((e.keyCode == 40 || e.keyCode == 83) && direction != 'up') {
		direction = 'down';
	} else if (e.keyCode == 82) {
		if (confirm('Do you want restart the game?')) {
			clearInterval(gameTimer);

			direction = 'up';
			score = 0;
			food = {
				x: Math.floor(Math.random() * canvas.width / box) * box,
				y: Math.floor(Math.random() * canvas.height / box) * box
			};

			snake = [
				{
					x: canvas.width / box / 2 * box,
					y: canvas.height / box / 2 * box
				},
				{
					x: canvas.width / box / 2 * box,
					y: (canvas.height / box / 2 + 1) * box
				},
				{
					x: canvas.width / box / 2 * box,
					y: (canvas.height / box / 2 + 2) * box
				}
			];
			gameTimer = setInterval(drawGame, 200);
		}
	} else if (e.keyCode == 80) {
		if (isGameStarted) {
			clearInterval(gameTimer);
			isGameStarted = false;

			ctx.fillStyle = '#009933';
			ctx.font = '50px Georgia';
			ctx.fillText('PAUSE', 120, canvas.height / 2);
		} else {
			isGameStarted = true;
			gameTimer = setInterval(drawGame, 200);
		}
	}
});

delayCount();

// Animation

// function loading() {
// 	const start = 9;
// 	const end = 137;

// 	var ball = document.getElementById('ball');
// 	var ppbtn = document.getElementById('ppbtn');

// 	timer = setInterval(frame, 34);

// 	function frame() {
// 		if (fob == 1) {
// 			ball.style.left = (steps += 1) + "px";
// 			if (steps == end) {
// 				fob = 0;
// 			}
// 		} else {
// 			ball.style.left = (steps -= 1) + "px";
// 			if (steps == start) {
// 				fob = 1;
// 			}
// 		}
// 	}

// }

// var fob = 1;
// var steps = 9;
// var isStarted = false;
// ppbtn.onclick = function () {
// 	switch (isStarted) {
// 		case false:
// 			isStarted = true;
// 			loading();
// 			break;
// 		case true:
// 			isStarted = false;
// 			cancelAnimationFrame(timer);
// 			clearInterval(timer);
// 			document.getElementById('ball').style.left = steps + "px";
// 			break;
// 	}
// }

// Modal window

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var closeBtn = document.getElementsByClassName('close');

btn.onclick = function () {
	modal.style.display = "block";
}
closeBtn.onclick = function () {
	modal.style.display = "none";
}
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

// Tabs - вкладки

var tab;
var tabContent;

window.onload = function () {
 	tabContent = document.getElementsByClassName('tabContent');
 	tab = document.getElementsByClassName('tab');
 }

function hideTabsContent(a) {
 	for (var i = a; i < tabContent.length; i++) {
 		tabContent[i].classList.remove('show');
 		tabContent[i].classList.add('hide');
 		tab[i].classList.remove('whiteborder'); 	
 	}
}

document.getElementById('tabs').onclick = function (event) {
	var target = event.target;
	if (target.className == 'tab'){
		for (var i = 0; i < tab.length; i++) {
			if (target == tab[i]) {
				showTabsContent(i);
				break;
			}
		}
	}
}

function showTabsContent(b) {
	if (tabContent[b].classList.contains('hide')) {
		hideTabsContent(0);
		tab[b].classList.add('whiteborder');
		tabContent[b].classList.remove('hide');
		tabContent[b].classList.add('show');
	}
}