// Player and enemy collision
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

  //Bullet and enemy collision
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

  export { checkCollision, checkBulletAndEnemyCollision }