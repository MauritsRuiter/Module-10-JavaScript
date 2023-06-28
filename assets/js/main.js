var ctx,
	cx = canvas.width / 2, // X-coordinate of the center of the ball
 	cy = canvas.height / 2,	// Y-coordinate of the center of the ball
	vx = 0,
	vy = 0,
	radius = 8,
	gravity = 0.1,
	damping = 0.4,
	traction = 0.6,
	paused = false;

var Trail = []; // Array to store the trail positions

var square = {
	x: Math.floor(Math.random() * 1400) + 1,
	y: Math.floor(Math.random() * 850) + 1,
	width: Math.floor(Math.random() * 100) + 5,
	height: Math.floor(Math.random() * 100) + 5,
	color: 'blue',
};

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = 1800;
	canvas.height = 900;

	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mouseup', handleMouseUp);

	circle();
}

function handleMouseDown(e) {
	resetBall(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
	paused = true;
};

function handleMouseUp(e) {
	vx = -(e.pageX - canvas.offsetLeft - cx) / 15;
	vy = -(e.pageY - canvas.offsetTop - cy) / 15;
	paused = false;
	requestAnimationFrame(circle);
};

function resetBall() {
	cx = 300;
	cy = 500;
	vx = 0;
	vy = 0;
	paused = true;
	
};

function circle() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!paused)
		requestAnimationFrame(circle);

	if (cx + radius >= canvas.width) {
		vx = -vx * damping;
		cx = canvas.width - radius;
	} else if (cx - radius <= 0) {
		vx = -vx * damping;
		cx = radius;
	}
	if (cy + radius >= canvas.height) {
		vy = -vy * damping;
		cy = canvas.height - radius;
		// traction here
		vx *= traction;
	} else if (cy - radius <= 0) {
		vy = -vy * damping;
		cy = radius;
	}

	vy += gravity; // <--- this is it

	cx += vx;
	cy += vy;

	// console.log(cx, cy);

	// Store the current position in the trail
	Trail.push({ x: cx, y: cy });

	// Limit the number of points in the trail to a certain length
	if (Trail.length > 10) {
		Trail.shift(); // Remove the oldest point from the trail
	}

	// Draw the trail
	ctx.beginPath();
	for (var i = 0; i < Trail.length; i++) {
		var point = Trail[i];
		ctx.lineTo(point.x, point.y);
	}
	ctx.strokeStyle = '#ffffff4d';
	ctx.lineWidth = 5;
	ctx.stroke();

	// Draw the square
	ctx.fillStyle = square.color;
	ctx.fillRect(square.x, square.y, square.width, square.height);

	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#fff';
	ctx.fill();

	if (
		cx + radius > square.x &&
		cx - radius < square.x + square.width &&
		cy + radius > square.y &&
		cy - radius < square.y + square.height
	  ) {
		var overlapLeft = Math.abs((cx + radius) - square.x);
		var overlapRight = Math.abs((cx - radius) - (square.x + square.width));
		var overlapTop = Math.abs((cy + radius) - square.y);
		var overlapBottom = Math.abs((cy - radius) - (square.y + square.height));
	  
		var minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

		if (minOverlap === overlapLeft) {
		  vx = Math.abs(vx) * -damping; // Reverse and dampen horizontal velocity
		  cx = square.x - radius - 1;
		  console.log('leftTouched = true');
		//   score.style.display = 'none';
		  resetBall();
		  document.getElementById("score").innerHTML + 1;
		  Math.floor(Math.random() * 100) + 1;
		} else if (minOverlap === overlapRight) {
		  vx = -Math.abs(vx) * -damping; // Reverse and dampen horizontal velocity
		  cx = square.x + square.width + radius + 1;
		  console.log('rightTouched = true');
		//   score.style.display = 'none';
		  resetBall();
		  document.getElementById("score").innerHTML + 1;
		} else if (minOverlap === overlapTop) {
		  vy = Math.abs(vy) * -damping; // Reverse and dampen vertical velocity
		  cy = square.y - radius - 1;
		  vx *= traction;
		  console.log('topTouched = true');
		//   score.style.display = 'none';
		  resetBall();
		  document.getElementById("score").innerHTML + 1;
		} else if (minOverlap === overlapBottom) {
		  vy = -Math.abs(vy) * -damping; // Reverse and dampen vertical velocity
		  cy = square.y + square.height + radius + 1;
		  vx *= traction;
		  console.log('bottomTouched = true');
		//   score.style.display = 'none';
		  resetBall();
		  document.getElementById("score").innerHTML + 1;
		}
	  }
}

init();

