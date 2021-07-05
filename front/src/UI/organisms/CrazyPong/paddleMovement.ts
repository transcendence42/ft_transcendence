import { drawRect } from './utils';

interface IPaddle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score: number;
}

const paddleMovement = (ctx: CanvasRenderingContext2D, paddle: IPaddle) => {
  drawRect(ctx, paddle.x, paddle.y, paddle.width, paddle.height, paddle.color);
};

export { paddleMovement };
