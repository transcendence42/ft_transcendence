import React, { useRef, useEffect } from 'react';

import './index.scss';
import { drawNet, drawText } from './utils';
import { BallMovement } from './ballMovement';
import { paddleMovement } from './paddleMovement';
import { collision } from './collision';
import { data } from './data';

const { ball, player1, player2 } = data;

const CANVAS_HEIGHT = 800;

interface IPlayingInfo {
  index: number;
  uuid?: string;
  ballX: number;
  ballY: number;
  player1Y: number;
  player2Y: number;
  createdAt?: string;
}

export const CrazyPongPresenter = ({
  playingInfo,
  updatePlayingInfoHandler,
  inputName,
}: {
  playingInfo: IPlayingInfo;
  updatePlayingInfoHandler: (playingInfo: IPlayingInfo) => void;
  inputName: string;
}) => {
  const { index, ballX, ballY, player1Y, player2Y } = playingInfo;
  console.log(index, ballX, ballY, player1Y, player2Y);

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
          paddleMovement(ctx, { ...player1, y: player1Y });
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
  }, [player1Y]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(event) => {
        if (inputName !== 'holee') {
          return;
        }
        if (event.clientY < event.currentTarget.getBoundingClientRect().top + player1.paddleHeight / 2) {
          console.log('hi');
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            ballX: ball.x,
            ballY: ball.y,
            player1Y: 0,
            player2Y: player2.y,
          });
          return (player1.y = 0);
        }
        if (
          event.clientY >
          event.currentTarget.getBoundingClientRect().top + CANVAS_HEIGHT - player1.paddleHeight / 2
        ) {
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            ballX: ball.x,
            ballY: ball.y,
            player1Y: CANVAS_HEIGHT - player1.paddleHeight,
            player2Y: player2.y,
          });
          return (player1.y = CANVAS_HEIGHT - player1.paddleHeight);
        }
        if (event.clientY - player1.paddleHeight / 2 > event.currentTarget.getBoundingClientRect().top) {
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            ballX: ball.x,
            ballY: ball.y,
            player1Y: event.clientY - event.currentTarget.getBoundingClientRect().top - player1.paddleHeight / 2,
            player2Y: player2.y,
          });
          return (player1.y =
            event.clientY - event.currentTarget.getBoundingClientRect().top - player1.paddleHeight / 2);
        }
      }}
      className="canvas"
      width="900"
      height={String(CANVAS_HEIGHT)}
    ></canvas>
  );
};
