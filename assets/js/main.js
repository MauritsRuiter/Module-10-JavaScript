var ctx,
	cx = 0,
	cy = 900,
	vx = 0,
	vy = 0,
	radius = 8,
	gravity = 0.1,
	damping = 0.4,
	traction = 0.6,
	paused = false;

var predictionTrail = []; // Array to store the prediction trail positions

var square = {
	x: 1700,
	y: 0,
	width: 100,
	height: 900,
	color: 'blue'
};

function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = 1800;
	canvas.height = 900;

	circle();
}

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

	console.log(cx, cy)

	// Store the current position in the prediction trail
	predictionTrail.push({ x: cx, y: cy });

	// Limit the number of points in the prediction trail to a certain length
	if (predictionTrail.length > 50) {
		predictionTrail.shift(); // Remove the oldest point from the trail
	}

	// Draw the prediction trail
	ctx.beginPath();
	for (var i = 0; i < predictionTrail.length; i++) {
		var point = predictionTrail[i];
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
		} else if (minOverlap === overlapRight) {
		  vx = -Math.abs(vx) * -damping; // Reverse and dampen horizontal velocity
		  cx = square.x + square.width + radius + 1;
		} else if (minOverlap === overlapTop) {
		  vy = Math.abs(vy) * -damping; // Reverse and dampen vertical velocity
		  cy = square.y - radius - 1;
		  vx *= traction;
		} else if (minOverlap === overlapBottom) {
		  vy = -Math.abs(vy) * -damping; // Reverse and dampen vertical velocity
		  cy = square.y + square.height + radius + 1;
		  vx *= traction;
		}
	  }
}

init();

// fancy/irrelevant mouse grab'n'throw stuff below
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
	cx = e.pageX - canvas.offsetLeft;
	cy = e.pageY - canvas.offsetTop;
	vx = vy = 0;
	paused = true;
};

function handleMouseUp(e) {
	vx = -(e.pageX - canvas.offsetLeft - cx);
	vy = -(e.pageY - canvas.offsetTop - cy);
	paused = false;
	circle();
};