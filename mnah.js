let canvas = document.querySelector('.canvas');
let car = document.querySelector('.car')
let enemies = [];
let bullets = [];
let carDirection = 'up'
let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;
let carWidth = car.offsetWidth;
let carHeight = car.offsetHeight;
let enemySpeed = 2;
let isPaused = false;
let enemyPosition;
let carHealthDiv = document.querySelector('.health')
let carHealth = carHealthDiv.offsetWidth
import { checkCollision, checkBulletAndEnemyCollision } from './js/collision.js' 


//Load
window.addEventListener('load', () => {
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
         enemyPosition = enemy.getBoundingClientRect();

        const deltaX = carPosition.x - enemyPosition.x;
        const deltaY = carPosition.y - enemyPosition.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const ratioX = deltaX / distance;
        const ratioY = deltaY / distance;

        enemy.style.left = `${enemyPosition.left + ratioX * enemySpeed}px`;
        enemy.style.top = `${enemyPosition.top + ratioY * enemySpeed}px`;

        if (checkCollision(carPosition, enemyPosition)) {
            carHealth -= 0.5
            carHealthDiv.style.width = (carHealth) + 'px'
            if(carHealth === 0){
              car.remove()
              isPaused = true
            }
          }
    });

    if(isPaused === false){
        requestAnimationFrame(enemyMove)
    }
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
                carDirection = 'up'
                if (currentBottom + carHeight < canvasHeight - carHeight + carHeight / 2) {
                    car.style.bottom = (currentBottom + 20) + 'px';
                    car.style.transform = 'rotate(0deg)';
                }
                break;

            case "KeyS":
                carDirection = 'down'
                if (currentBottom > 0) {
                    car.style.bottom = (currentBottom - 20) + 'px';
                    car.style.transform = 'rotate(180deg)';
                }
                break;

            case "KeyD":
                carDirection = 'right'
                if (currentLeft + carWidth < canvasWidth - carWidth) {
                    car.style.left = (currentLeft + 20) + 'px';
                    car.style.transform = 'rotate(90deg)';
                }
                break;

            case "KeyA":
                carDirection = 'left'
                if (currentLeft - carWidth > 0) {
                    car.style.left = (currentLeft - 20) + 'px';
                    car.style.transform = 'rotate(270deg)';
                }
                break;
        }
    });
}

//End Car Move


//Shoot bullet

function moveBullets() {
    bullets.forEach((bulletData, bulletIndex) => {
      const { bullet, bulletDirection } = bulletData;
      const bulletPosition = bullet.getBoundingClientRect(); 
  
      if (bulletDirection === 'up') {
        bullet.style.top = `${parseFloat(bullet.style.top) - 5}px`;
      } else if (bulletDirection === 'down') {
        bullet.style.top = `${parseFloat(bullet.style.top) + 5}px`;
      } else if (bulletDirection === 'right') {
        bullet.style.left = `${parseFloat(bullet.style.left) + 5}px`;
      } else if (bulletDirection === 'left') {
        bullet.style.left = `${parseFloat(bullet.style.left) - 5}px`;
      }
  
      enemies.forEach((enemy, enemyIndex) => {
        const enemyPosition = enemy.getBoundingClientRect();
        if (checkBulletAndEnemyCollision(bulletPosition, enemyPosition)) {
          bullet.remove();
          enemy.remove();
          bullets.splice(bulletIndex, 1);
          enemies.splice(enemyIndex, 1);
          if(enemies.length === 0){
            car.remove()
            isPaused = true
          }
        }
      });
    });
  
    if (!isPaused) {
      requestAnimationFrame(moveBullets);
    }
  }

  window.addEventListener('keydown', (e) => {
    let key = e.code;
    if (key === 'Space') {
        const carPosition = car.getBoundingClientRect();
        let bullet = document.createElement('div');
        bullet.classList.add('bullet');
        let bulletDirection;

        switch (carDirection) {
            case 'right':
                bullet.style.transform = 'rotate(90deg)';
                bullet.style.left = `${carPosition.left + carPosition.width}px`;
                bullet.style.top = `${carPosition.top + 18}px`;
                bulletDirection = 'right';
                break;
            case 'left':
                bullet.style.transform = 'rotate(270deg)';
                bullet.style.left = `${carPosition.left - carPosition.width + 100}px`;
                bullet.style.top = `${carPosition.top + 12}px`;
                bulletDirection = 'left';
                break;
            case 'up':
                bullet.style.transform = 'rotate(360deg)';
                bullet.style.top = `${carPosition.top - 15}px`;
                bullet.style.left = `${carPosition.left + carPosition.width / 3}px`;
                bulletDirection = 'up';
                break;
            case 'down':
                bullet.style.transform = 'rotate(180deg)';
                bullet.style.left = `${carPosition.left + carPosition.width / 3}px`;
                bullet.style.top = `${carPosition.top + 65}px`;
                bulletDirection = 'down';
                break;
            default:
                break;
        }

        canvas.append(bullet);
        bullets.push({ bullet, bulletDirection });
    }
});


//End shoot 

function gameStart(){
    carMove()
    enemyMove()
    moveBullets()
}

gameStart()