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

//Load

window.addEventListener('load', () => {
    // Road Line
   for (let i = 0; i < 10; i++) {
    let roadLine = document.createElement('div');
    roadLine.classList.add('road_line');
    roadLine.style.top = i * 20 + '%';
    canvas.append(roadLine);
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

//Check Collision

function checkCollision(carPosition, enemyPosition) {
    const carRect = carPosition;
    const enemyRect = enemyPosition;
  
    return (
      carRect.right > enemyRect.left &&
      carRect.left < enemyRect.right &&
      carRect.bottom > enemyRect.top &&
      carRect.top < enemyRect.bottom
    );
  }


  function checkBulletAndEnemyCollision(bulletPosition, enemyPosition) {
    const bulletRect = bulletPosition;
    const enemyRect = enemyPosition;
  
    return (
      bulletRect.right > enemyRect.left &&
      bulletRect.left < enemyRect.right &&
      bulletRect.bottom > enemyRect.top &&
      bulletRect.top < enemyRect.bottom
    );
  }



//End CheckColission


//Enemy Move

function enemyMove() {
    const carPosition = car.getBoundingClientRect();
    enemies.forEach((enemy, enemyIndex) => {
         enemyPosition = enemy.getBoundingClientRect();

        const deltaX = carPosition.x - enemyPosition.x;
        const deltaY = carPosition.y - enemyPosition.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const ratioX = deltaX / distance;
        const ratioY = deltaY / distance;

        enemy.style.left = `${enemyPosition.left + ratioX * enemySpeed}px`;
        enemy.style.top = `${enemyPosition.top + ratioY * enemySpeed}px`;

        if (checkCollision(carPosition, enemyPosition)) {
            console.log('Crash!');
            car.remove()
            isPaused = true
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
          console.log('Kill!');
          bullet.remove();
          enemy.remove();
          bullets.splice(bulletIndex, 1);
          enemies.splice(enemyIndex, 1);
        }
      });
    });
  
    if (!isPaused) {
      requestAnimationFrame(moveBullets);
    }
  }

window.addEventListener('keydown', (e) => {
    let key = e.code
    if(key === 'Space'){
    const carPosition = car.getBoundingClientRect();
    let bullet = document.createElement('div')
    bullet.classList.add('bullet')
    let bulletDirection;
    if (carDirection === 'right') {
        bullet.style.left = `${carPosition.left + carPosition.width}px`;
        bullet.style.top = `${carPosition.top + 18}px`;
        bulletDirection = 'right';
    } else if (carDirection === 'left') {
        bullet.style.left = `${carPosition.left - carPosition.width + 100}px`;
        bullet.style.top = `${carPosition.top + 12}px`;
        bulletDirection = 'left';
    } else if (carDirection === 'up') {
        bullet.style.top = `${carPosition.top - 15}px`;
        bullet.style.left = `${carPosition.left + carPosition.width / 3}px`;
        bulletDirection = 'up';
    } else if (carDirection === 'down') {
        bullet.style.left = `${carPosition.left + carPosition.width / 3}px`;
        bullet.style.top = `${carPosition.top + 65}px`;
        bulletDirection = 'down';
    }
    canvas.append(bullet)
    bullets.push({ bullet, bulletDirection });
    }
})

//End shoot 

function gameStart(){
    carMove()
    enemyMove()
    moveBullets()
}

gameStart()