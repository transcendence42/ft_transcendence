import { IPlayingUpdateInfo } from '../../../utils/interface';

const BallMovement = (
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  ballVelocityX: number,
  ballVelocityY: number,
  updatePlayingInfoHandler: (playingInfo: IPlayingUpdateInfo) => void,
) => {
  updatePlayingInfoHandler({
    index: 1,
    uuid: '1',
    ballX: ballVelocityX + ballX,
    // ballY: ballVelocityY + ballY,
  });
  // ball.x += ball.velocityX;
  // ball.y += ball.velocityY;
};

export { BallMovement };
