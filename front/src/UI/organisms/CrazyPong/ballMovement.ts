import { drawCircle } from './utils';
import { IBall } from '../../../utils/interface';

const BallMovement = (ctx: CanvasRenderingContext2D, ball: IBall) => {
  drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
};

export { BallMovement };
