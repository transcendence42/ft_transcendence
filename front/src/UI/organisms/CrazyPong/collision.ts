import { IPaddle, IBall, IPlayingInfo } from '../../../utils/interface';

const collision = (
  canvas: HTMLCanvasElement,
  ball: IBall,
  player1: IPaddle,
  player2: IPaddle,
  player1Y: number,
  player2Y: number,
  player1Score: number,
  player2Score: number,
  updatePlayingInfoHandler: (playingInfo: IPlayingInfo) => void,
) => {
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY *= -1;
  }

  // player1 paddle collision
  if (ball.x - ball.radius <= 0) {
    if (player1.y + player1.paddleHeight >= ball.y && player1.y <= ball.y) {
      ball.velocityX *= -1;
    } else {
      player2.score += 1;
      // updatePlayingInfoHandler({
      //   index: 1,
      //   uuid: '1',
      //   ballX: ball.x,
      //   ballY: ball.y,
      //   player1Y: player1Y,
      //   player2Y: player2Y,
      //   player1Score: player1Score,
      //   player2Score: player2Score + 1,
      // });
      return false;
    }
  }

  // player2 paddle collision
  if (ball.x + ball.radius >= canvas.width) {
    if (player2.y + player2.paddleHeight >= ball.y && player2.y <= ball.y) {
      ball.velocityX *= -1;
    } else {
      player1.score += 1;
      // updatePlayingInfoHandler({
      //   index: 1,
      //   uuid: '1',
      //   ballX: ball.x,
      //   ballY: ball.y,
      //   player1Y: player1Y,
      //   player2Y: player2Y,
      //   player1Score: player1Score + 1,
      //   player2Score: player2Score,
      // });
      return false;
    }
  }
  return true;
};

export { collision };
