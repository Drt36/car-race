let panel = document.getElementById("panel");
let roadPositionY = 1;
let direction = { x: 0 };

/*Player Car*/
const playerCar = {
  x: Math.floor(Math.random() * (39 - 9)) + 9,
  node: null,
};

//otherCar=[{x:2,y:4}]

displayePlayerCar();

window.addEventListener("keydown", moveCar);
window.addEventListener("keyup", stopCar);

setInterval(() => {
  moveRoad();
  updateCarPosition();
  checkSideCollision();
}, 100);

/*Move Road*/
function moveRoad() {
  roadPositionY += 10;
  panel.style.transition = "1s linear";
  panel.style.backgroundPositionY = roadPositionY + "px";
}

function displayePlayerCar() {
  let playerCarBody = document.createElement("div");
  playerCarBody.style.top = "70vh";
  playerCarBody.style.width = "50px";
  playerCarBody.style.height = "100px";
  playerCarBody.style.position = "absolute";
  playerCarBody.style.left = playerCar.x + "vw";
  playerCarBody.style.backgroundSize = "contain";
  playerCarBody.style.transition = "0.5s linear";
  playerCarBody.style.backgroundImage = "URL('./assets/images/car-green.png')";

  let carBodyNode = panel.appendChild(playerCarBody);
  playerCar.node = carBodyNode;
}

function checkSideCollision() {
  if (playerCar.x >= 40 || playerCar.x <= 10) {
    console.log("Road Side Collision");
  }
}

function updateCarPosition() {
  playerCar.x = playerCar.x + direction.x;
  playerCar.node.style.left = playerCar.x + "vw";
}

/*Event Handeler*/
function moveCar(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  if (e.keyCode == LEFT_KEY) {
    direction.x = -1;
  } else if (e.keyCode == RIGHT_KEY) {
    direction.x = 1;
  }
}

function stopCar(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  if (e.keyCode == LEFT_KEY) {
    direction.x = 0;
  } else if (e.keyCode == RIGHT_KEY) {
    direction.x = 0;
  }
}
