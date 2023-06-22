const btn = document.getElementById('btn');
// var canvas = document.getElementById('canvas');
const speedoWrapperAngle = document.getElementById('speedo-wrapper-angle');
const sBoxAngle = document.getElementById('s-box-angle');
const speedoWrapperSpeed = document.getElementById('speedo-wrapper-speed');
const sBoxSpeed = document.getElementById('s-box-speed');

btn.addEventListener('click', () => {
  // Hide button when clicked so game doesn't run multiple times at once
  // 👇️ hide button (still takes up space on page)
  btn.style.opacity = '0';
  setTimeout(function() {
    btn.style.display = 'none';
    // canvas.style.display = 'initial';
    speedoWrapperAngle.style.display = 'initial';
    sBoxAngle.style.display = 'initial';
    speedoWrapperSpeed.style.display = 'initial';
    sBoxSpeed.style.display = 'initial';
}, 700);
});


// SQL Vertaald naar JavaScript door Chat-GPT
// Angle Speedometer
function setValue(angle, speed) {
  document.getElementById('counter-angle').textContent = Math.round(angle / 180 * 100) + '%';
  console.log(Math.round(angle / 180 * 100));
  document.getElementById('arrow-angle').style.transform = 'rotate(' + angle + 'deg)';

  document.getElementById('counter-speed').textContent = Math.round(speed / 180 * 100) +'%';
  console.log(Math.round(speed / 180 * 100));
  document.getElementById('arrow-speed').style.transform = 'rotate(' + speed + 'deg)';

  var canvas,
  ctx,
  positionX = 0,  
  positionY = 800,
  // hieronder de values invullen van de speedometers! hahaaa
  // velocityY = 36,
  velocityY = angle / 180 * 100,
  // velocityX = 70,
  velocityX = speed / 180 * 100,
  radius = 8,
  gravity = 0.16,
  damping = 0.4,
  traction = 0.6,
  paused = false;
  

function init() {

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  canvas.width = 1600;
  canvas.height = 800;

  circle();
}

function circle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!paused)
    requestAnimationFrame(circle);

  if (positionX + radius >= canvas.width) {
    velocityX = -velocityX * damping;
    positionX = canvas.width - radius;
  } else if (positionX - radius <= 0) {
    velocityX = -velocityX * damping;
    positionX = radius;
  }
  if (positionY + radius >= canvas.height) {
    velocityY = -velocityY * damping;
    positionY = canvas.height - radius;
    // traction here
    velocityX *= traction;
  } else if (positionY - radius <= 0) {
    velocityY = -velocityY * damping;
    positionY = radius;
  }

  velocityY += gravity; // <--- this is it

  positionX += velocityX;
  positionY += velocityY;

  ctx.beginPath();
  ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#fff';
  ctx.fill();
}

init();

  return {
    angle: angle,
    speed: speed
  };
}

function updateCanvas(angle, speed) {
  velocityY = angle / 180 * 100;
  velocityX = speed / 180 * 100;
}
function circle() {
  updateCanvas(angle, speed);
}

testParamAngle.addEventListener('change', function() {
  var angleValue = testParamAngle.value;
  var speedValue = testParamSpeed.value;
  var values = setValue(angleValue, speedValue);
  updateCanvas(values.angle, values.speed);
});

testParamSpeed.addEventListener('change', function() {
  var angleValue = testParamAngle.value;
  var speedValue = testParamSpeed.value;
  var values = setValue(angleValue, speedValue);
  updateCanvas(values.angle, values.speed);
});

// CANVAS GRAVITY CODE

