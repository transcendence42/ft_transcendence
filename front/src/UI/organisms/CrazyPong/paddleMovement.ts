import { drawRect } from './utils';
import { IPaddle } from '../../../utils/interface';

const paddleMovement = (ctx: CanvasRenderingContext2D, paddle: IPaddle) => {
  drawRect(ctx, paddle.x, paddle.y, paddle.paddleWidth, paddle.paddleHeight, paddle.color);
};

export { paddleMovement };
