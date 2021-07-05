interface IBall {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  speed: number;
  color: string;
}

interface IPaddle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score: number;
}

const collision = (canvas: HTMLCanvasElement, ball: IBall, player1: IPaddle, player2: IPaddle) => {
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY *= -1;
  }

  // player1 paddle collision
  if (ball.x - ball.radius <= 0) {
    if (player1.y + player1.height >= ball.y && player1.y <= ball.y) {
      ball.velocityX *= -1;
    } else {
      player2.score += 1;
      return false;
    }
  }

  // player2 paddle collision
  if (ball.x + ball.radius >= canvas.width) {
    if (player2.y + player2.height >= ball.y && player2.y <= ball.y) {
      ball.velocityX *= -1;
    } else {
      player1.score += 1;
      return false;
    }
  }
  return true;
};

export { collision };
