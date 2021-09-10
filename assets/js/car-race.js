let panel=document.getElementById("panel");
let roadPositionY=1;

//playerCar={x:1,y:2}
//otherCar=[{x:2,y:4}]
console.log(panel)

setInterval(() => {
    moveRoad()
}, 100);

function moveRoad(){
    roadPositionY+=10;
    panel.style.backgroundPositionY=roadPositionY+'px';
    panel.style.transition='1s linear';
};