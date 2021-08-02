import { drawCircle } from './utils';
import { IBall, IPlayingUpdateInfo } from '../../../utils/interface';

const BallMovement = (
  ctx: CanvasRenderingContext2D,
  ball: IBall,
  ballX: number,
  ballY: number,
  ballVelocityX: number,
  ballVelocityY: number,
  updatePlayingInfoHandler: (playingInfo: IPlayingUpdateInfo) => void,
) => {
  drawCircle(ctx, ballX, ballY, ball.radius, ball.color);
  updatePlayingInfoHandler({
    index: 1,
    uuid: '1',
    ballX: ballVelocityX + ballX,
    ballY: ballVelocityY + ballY,
  });
  // ball.x += ball.velocityX;
  // ball.y += ball.velocityY;
};

export { BallMovement };
