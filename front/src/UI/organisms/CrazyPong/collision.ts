import { IPaddle, IBall, IPlayingUpdateInfo } from '../../../utils/interface';

const collision = (
  canvas: HTMLCanvasElement,
  ball: IBall,
  ballX: number,
  ballY: number,
  ballVelocityX: number,
  ballVelocityY: number,
  player1: IPaddle,
  player2: IPaddle,
  player1Y: number,
  player2Y: number,
  player1Score: number,
  player2Score: number,
  updatePlayingInfoHandler: (playingInfo: IPlayingUpdateInfo) => void,
) => {
  if (ballY - ball.radius < 0 || ballY + ball.radius > canvas.height) {
    // ball.velocityY *= -1;
    updatePlayingInfoHandler({
      index: 1,
      uuid: '1',
      ballVelocityY: ballVelocityY * -1,
    });
  }

  // player1 paddle collision
  if (ballX - ball.radius <= 0) {
    if (player1Y + player1.paddleHeight >= ballY && player1Y <= ballY) {
      // ball.velocityX *= -1;
      updatePlayingInfoHandler({
        index: 1,
        uuid: '1',
        ballVelocityX: ballVelocityX * -1,
      });
    } else {
      // player2.score += 1;
      updatePlayingInfoHandler({
        index: 1,
        uuid: '1',
        player2Score: player2Score + 1,
      });
      return false;
    }
  }

  // player2 paddle collision
  if (ballX + ball.radius >= canvas.width) {
    if (player2Y + player2.paddleHeight >= ballY && player2Y <= ballY) {
      // ball.velocityX *= -1;
      updatePlayingInfoHandler({
        index: 1,
        uuid: '1',
        ballVelocityX: ballVelocityX * -1,
      });
    } else {
      // player1.score += 1;
      updatePlayingInfoHandler({
        index: 1,
        uuid: '1',
        player1Score: player1Score + 1,
      });
      return false;
    }
  }
  return true;
};

export { collision };
