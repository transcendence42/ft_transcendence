import React, { useRef, useEffect } from 'react';

import './index.scss';
import { drawNet, drawText } from './utils';
import { BallMovement } from './ballMovement';
import { paddleMovement } from './paddleMovement';
import { collision } from './collision';
import { data } from './data';
import { IPlayingInfo, IPlayingUpdateInfo } from '../../../utils/interface';

const { ball, player1, player2 } = data;

const CANVAS_HEIGHT = 800;

export const CrazyPongPresenter = ({
  playingInfo,
  updatePlayingInfoHandler,
  inputName,
}: {
  playingInfo: IPlayingInfo;
  updatePlayingInfoHandler: (playingInfo: IPlayingUpdateInfo) => void;
  inputName: string;
}) => {
  const { index, ballX, ballY, player1Y, player2Y, player1Score, player2Score } = playingInfo;
  console.log(index, ballX, ballY, player1Y, player2Y, player1Score, player2Score);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawText(ctx, String(player1Score), canvas.width / 4 - 20, canvas.height / 5, 'white');
          drawText(ctx, String(player2Score), (3 * canvas.width) / 4 - 20, canvas.height / 5, 'white');
          drawNet(ctx, canvas.width, canvas.height);
          BallMovement(ctx, ball);
          paddleMovement(ctx, { ...player1, y: player1Y });
          paddleMovement(ctx, { ...player2, y: player2Y });

          if (
            inputName === 'player1' &&
            !collision(canvas, ball, player1, player2, player1Score, player2Score, updatePlayingInfoHandler)
          ) {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
          }
          requestAnimationFrame(render);
        }
      }
    };
    render();
  }, [player1Y, player2Y, player1Score, player2Score, updatePlayingInfoHandler]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(event) => {
        if (event.clientY < event.currentTarget.getBoundingClientRect().top + player1.paddleHeight / 2) {
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            player1Y: inputName === 'player1' ? 0 : player1Y,
            player2Y: inputName === 'player2' ? 0 : player2Y,
          });
        }
        if (
          event.clientY >
          event.currentTarget.getBoundingClientRect().top + CANVAS_HEIGHT - player1.paddleHeight / 2
        ) {
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            player1Y: inputName === 'player1' ? CANVAS_HEIGHT - player1.paddleHeight : player1Y,
            player2Y: inputName === 'player2' ? CANVAS_HEIGHT - player2.paddleHeight : player2Y,
          });
        }
        if (event.clientY - player1.paddleHeight / 2 > event.currentTarget.getBoundingClientRect().top) {
          updatePlayingInfoHandler({
            index: 1,
            uuid: '1',
            player1Y:
              inputName === 'player1'
                ? event.clientY - event.currentTarget.getBoundingClientRect().top - player1.paddleHeight / 2
                : player1Y,
            player2Y:
              inputName === 'player2'
                ? event.clientY - event.currentTarget.getBoundingClientRect().top - player2.paddleHeight / 2
                : player2Y,
          });
        }
      }}
      className="canvas"
      width="900"
      height={String(CANVAS_HEIGHT)}
    ></canvas>
  );
};
