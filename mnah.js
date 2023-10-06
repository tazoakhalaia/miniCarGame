let canvas = document.querySelector('.canvas');
let car = document.querySelector('.car')
let enemies = [];
let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;
let carWidth = car.offsetWidth;
let carHeight = car.offsetHeight;
let enemySpeed = 2;

//Load

window.addEventListener('load', () => {
    // Road Line
   for (let i = 0; i < 10; i++) {
    let roadLine = document.createElement('div');
    roadLine.classList.add('road_line');
    roadLine.style.top = i * 20 + '%';
    canvas.append(roadLine);
    console.log(roadLine);
   }


   //Enemy Loop

   for (let enemyIndex = 0; enemyIndex < 5; enemyIndex++) {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.right =`${Math.random() * 100}%`;
    canvas.append(enemy);
    enemies.push(enemy);
}
})

//End Load


//Enemy Move
function enemyMove() {
    const carPosition = car.getBoundingClientRect();
    enemies.forEach((enemy) => {
        const enemyPosition = enemy.getBoundingClientRect();

        const deltaX = carPosition.x - enemyPosition.x;
        const deltaY = carPosition.y - enemyPosition.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const ratioX = deltaX / distance;
        const ratioY = deltaY / distance;

        enemy.style.left = `${enemyPosition.left + ratioX * enemySpeed}px`;
        enemy.style.top = `${enemyPosition.top + ratioY * enemySpeed}px`;
    });
}

//End Enemy Move

//Car Move
function carMove() {
    window.addEventListener('keydown', (e) => {
        let key = e.code;
        let currentBottom = parseFloat(car.style.bottom) || 0;
        let currentLeft = parseFloat(car.style.left) || 0;

        switch (key) {
            case "KeyW":
                if (currentBottom + carHeight < canvasHeight - carHeight + carHeight / 2) {
                    car.style.bottom = (currentBottom + 20) + 'px';
                    car.style.transform = 'rotate(0deg)';
                }
                break;

            case "KeyS":
                if (currentBottom > 0) {
                    car.style.bottom = (currentBottom - 20) + 'px';
                    car.style.transform = 'rotate(180deg)';
                }
                break;

            case "KeyD":
                if (currentLeft + carWidth < canvasWidth - carWidth) {
                    car.style.left = (currentLeft + 20) + 'px';
                    car.style.transform = 'rotate(90deg)';
                }
                break;

            case "KeyA":
                if (currentLeft - carWidth > 0) {
                    car.style.left = (currentLeft - 20) + 'px';
                    car.style.transform = 'rotate(270deg)';
                }
                break;
        }
    });
}


//End Car Move

function gameStart(){
    carMove()
    enemyMove()
    setInterval(enemyMove, 100);
}

gameStart()