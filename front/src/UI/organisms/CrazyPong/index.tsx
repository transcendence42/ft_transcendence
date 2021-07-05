import React, { useRef, useEffect } from 'react';

import './index.scss';
import { drawNet, drawText } from './utils';
import { BallMovement } from './ballMovement';
import { paddleMovement } from './paddleMovement';
import { collision } from './collision';
import { data } from './data';

const { ball, player1, player2 } = data;

const CrazyPong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawText(ctx, String(player1.score), canvas.width / 4 - 20, canvas.height / 5, 'white');
          drawText(ctx, String(player2.score), (3 * canvas.width) / 4 - 20, canvas.height / 5, 'white');
          drawNet(ctx, canvas.width, canvas.height);
          BallMovement(ctx, ball);
          paddleMovement(ctx, player1);
          paddleMovement(ctx, player2);

          if (!collision(canvas, ball, player1, player2)) {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
          }

          requestAnimationFrame(render);
        }
      }
    };
    render();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(event) => {
        if (event.clientY < event.currentTarget.getBoundingClientRect().top + player1.height / 2) {
          return (player1.y = 0);
        }
        if (event.clientY > event.currentTarget.getBoundingClientRect().top + 500 - player1.height / 2) {
          return (player1.y = 500 - player1.height);
        }
        if (event.clientY - player1.height / 2 > event.currentTarget.getBoundingClientRect().top) {
          return (player1.y = event.clientY - event.currentTarget.getBoundingClientRect().top - player1.height / 2);
        }
      }}
      className="canvas"
      width="900"
      height="500"
    ></canvas>
  );
};

export default CrazyPong;
