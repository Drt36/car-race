let panel = document.getElementById("panel");
let roadPositionY = 1;
let playerCarDirection = { x: 0 };
let otherCarDirection = { x: 1 };
let interval;

/*Player Car*/
const playerCar = {
  x: Math.floor(Math.random() * (39 - 10)) + 10,
  y: 70,
  node: null,
  width: 2.604,
};

/*Other Car*/
const otherCar = {
  x: Math.floor(Math.random() * (39 - 9)) + 9,
  y: 2,
  node: null,
  width: 2.604,
};
window.addEventListener("keydown", moveCar);
window.addEventListener("keyup", stopCar);

start();
function start() {
  displayePlayerCar();
  displayeOtherCar();

  interval = setInterval(() => {
    moveRoad();
    updatePlayerCarPosition();
    updateOtherCarPosition();
    removeOtherCar();
    checkSideCollision();
    checkCarCollision();
  }, 50);
}

/*Move Road*/
function moveRoad() {
  roadPositionY += 10;
  panel.style.transition = "1s linear";
  panel.style.backgroundPositionY = roadPositionY + "px";
}

/*Display Player Car*/
function displayePlayerCar() {
  let playerCarBody = document.createElement("div");
  playerCarBody.style.width = playerCar.width + "vw";
  playerCarBody.style.height = "100px";
  playerCarBody.style.position = "absolute";
  playerCarBody.style.left = playerCar.x + "vw";
  playerCarBody.style.top = playerCar.y + "vh";
  playerCarBody.style.backgroundSize = "contain";
  playerCarBody.style.transition = "0.5s linear";
  playerCarBody.style.backgroundImage = "URL('./assets/images/car-green.png')";

  let carBodyNode = panel.appendChild(playerCarBody);
  playerCar.node = carBodyNode;
}

/*Display Other Car*/
function displayeOtherCar() {
  let otherCarBody = document.createElement("div");

  otherCarBody.style.width = otherCar.width + "vw";
  otherCarBody.style.height = "90px";
  otherCarBody.style.position = "absolute";
  otherCarBody.style.left = otherCar.x + "vw";
  otherCarBody.style.top = otherCar.y + "vh";
  otherCarBody.style.backgroundSize = "contain";
  otherCarBody.style.transition = "0.5s linear";
  otherCarBody.style.transform = "rotate(180deg)";
  otherCarBody.style.backgroundImage = "URL('./assets/images/car-red.png')";

  let otherCarBodyNode = panel.appendChild(otherCarBody);
  otherCar.node = otherCarBodyNode;
}

/*Check Road Side Collision */
function checkSideCollision() {
  if (playerCar.x >= 40 || playerCar.x <= 10) {
    gameOver();
  }
}

/*Check Collision between cars */
function checkCarCollision() {
  let x = playerCar.x - otherCar.x;
  let y = playerCar.y - otherCar.y;
  let distance = Math.sqrt(x * x + y * y);

  let collisionDistance = (playerCar.width + otherCar.width) / 2;
  if (distance <= collisionDistance) {
    gameOver();
  }
}

/*Update Player Car Position */
function updatePlayerCarPosition() {
  playerCar.x = playerCar.x + playerCarDirection.x;
  playerCar.node.style.left = playerCar.x + "vw";
}

/*Update Other Car Position */
function updateOtherCarPosition() {
  otherCar.y = otherCar.y + otherCarDirection.x;
  otherCar.node.style.top = otherCar.y + "vh";
}

/*Remove other car */
function removeOtherCar() {
  if (otherCar.y >= 95) {
    otherCar.y=2;
    otherCar.x=Math.floor(Math.random() * (39 - 9)) + 9;
    displayeOtherCar();
  }
}

/*Key down Event*/
function moveCar(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  if (e.keyCode == LEFT_KEY) {
    playerCarDirection.x = -1;
  } else if (e.keyCode == RIGHT_KEY) {
    playerCarDirection.x = 1;
  }
}

/*Keyup Event */
function stopCar(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  if (e.keyCode == LEFT_KEY) {
    playerCarDirection.x = 0;
  } else if (e.keyCode == RIGHT_KEY) {
    playerCarDirection.x = 0;
  }
}

/*Game Over Function */
function gameOver() {
  playerCar.node.style.display = "none";
  otherCar.node.style.display = "none";
  window.clearInterval(interval);
  let gameOverBody = document.createElement("div");

  gameOverBody.style.position = "absolute";
  gameOverBody.style.left = "10vw";
  gameOverBody.style.top = "10vh";
  gameOverBody.style.transition = "0.5s linear";
  gameOverBody.innerHTML =
    "<h1>Game Over!!!</h1> <button id='tryagain-btn'>Try Again</button>";
  gameOverBody.style.color = "red";
  gameOverBody.style.fontSize = "3rem";
  panel.appendChild(gameOverBody);
  let tryAgainBtn = document.getElementById("tryagain-btn");

  tryAgainBtn.addEventListener("click", () => {
    location.reload();
  });
}
