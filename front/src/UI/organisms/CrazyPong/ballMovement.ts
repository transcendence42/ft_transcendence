import { drawCircle } from './utils';

interface IBall {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  speed: number;
  color: string;
}

const BallMovement = (ctx: CanvasRenderingContext2D, ball: IBall) => {
  drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
};

export { BallMovement };
