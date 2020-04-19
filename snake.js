// Snake
 
// add score lider table
// add border / no-border modes

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const body = document.getElementById('body');
const box = 20;

canvas.width = 400;
canvas.height = 400;

let gameTimer, count, gameOverTimer;
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

	setTimeout(function() {
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
	}, 1000);
}

function delayCount() {
	clearInterval(gameOverTimer);

	body.style.overflow = 'hidden';
	let c = 3;
	let grad = ctx.createLinearGradient(50, 200, canvas.width, 250);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(1, 'blue');

	ctx.fillStyle = grad;
	ctx.font = '50px Georgia';

	count = setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(c, canvas.width / 2, canvas.height / 2);
		c--;
		if (c == -1) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillText('Go', canvas.width / 2 - box, canvas.height / 2);
			clearInterval(count);
			setTimeout(function(){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				gameTimer = setInterval(drawGame, 200);
			}, 1000);
		}
	} ,1000);
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
			delayCount();
		}
	} else if (e.keyCode == 80) {
		if (isGameStarted) {
			clearInterval(gameTimer);
			isGameStarted = false;

			ctx.fillStyle = '#009933';
			ctx.font = '50px Georgia';
			ctx.fillText('PAUSE', 120, canvas.height / 2);

			body.style.overflow = 'visible';
		} else {
			isGameStarted = true;
			delayCount();
		}
	}
});

delayCount();