import React, { useRef, useEffect } from 'react';

import './index.scss';
import { drawCircle, drawNet, drawText } from './utils';
// import { BallMovement } from './ballMovement';
import { paddleMovement } from './paddleMovement';
// import { collision } from './collision';
import { data } from './data';
import { IPlayingInfo, IPlayingUpdateInfo } from '../../../utils/interface';
import { postgresTimeToDate } from '../../../utils/util';
// import { postgresTimeToDate } from '../../../utils/util';

// const { player1, player2 } = data;
const { ball, player1, player2 } = data;

const CANVAS_HEIGHT = 800;
let start, previousTimeStamp;
let serverTime = 0;
let pongSequence = -1;

export const CrazyPongPresenter = ({
  playingInfo,
  updatePlayingInfoHandler,
  inputName,
}: {
  playingInfo: IPlayingInfo;
  updatePlayingInfoHandler: (playingInfo: IPlayingUpdateInfo) => void;
  inputName: string;
}) => {
  // console.log(Date.parse(String(postgresTimeToDate(data.playingInfo.modifiedAt))));
  const {
    ballX,
    ballY,
    ballVelocityX,
    ballVelocityY,
    player1Y,
    player2Y,
    player1Score,
    player2Score,
    sequence,
    modifiedAt,
  } = playingInfo;
  // console.log(
  //   sequence,
  //   ballX,
  //   ballY,
  //   ballVelocityX,
  //   ballVelocityY,
  //   player1Y,
  //   player2Y,
  //   player1Score,
  //   player2Score,
  //   inputName,
  //   modifiedAt,
  // );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = (timestamp) => {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      if (previousTimeStamp !== timestamp) {
        // 1 초 후 로직
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            if (pongSequence >= sequence) {
              return;
            }
            if (Date.parse(String(postgresTimeToDate(modifiedAt))) < serverTime) {
              return;
            }
            pongSequence = sequence;
            serverTime = Date.parse(String(postgresTimeToDate(modifiedAt)));
            console.log(modifiedAt, sequence, ballX, ballY, player1Y, player2Y);
            // console.log(pongSequence);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawText(ctx, String(player1Score), canvas.width / 4 - 20, canvas.height / 5, 'white');
            drawText(ctx, String(player2Score), (3 * canvas.width) / 4 - 20, canvas.height / 5, 'white');
            drawNet(ctx, canvas.width, canvas.height);
            drawCircle(ctx, ballX, ballY, ball.radius, ball.color);
            // if (inputName === 'player1') {
            //   BallMovement(ctx, ballX, ballY, ballVelocityX, ballVelocityY, updatePlayingInfoHandler);
            // }
            paddleMovement(ctx, { ...player1, y: player1Y });
            paddleMovement(ctx, { ...player2, y: player2Y });

            // if (
            //   inputName === 'player1' &&
            //   !collision(
            //     canvas,
            //     ball,
            //     ballX,
            //     ballY,
            //     ballVelocityX,
            //     ballVelocityY,
            //     player1,
            //     player2,
            //     player1Y,
            //     player2Y,
            //     player1Score,
            //     player2Score,
            //     updatePlayingInfoHandler,
            //   )
            // ) {
            //   updatePlayingInfoHandler({
            //     index: 1,
            //     uuid: '1',
            //     ballX: canvas.width / 2,
            //     ballY: canvas.height / 2,
            //   });
            //   // ball.x = canvas.width / 2;
            //   // ball.y = canvas.height / 2;
            // }
          }

          if (elapsed < 1000) {
            // Stop the animation after 1 seconds
            previousTimeStamp = timestamp;
            window.requestAnimationFrame(render);
          }
        }
      }
    };
    window.requestAnimationFrame(render);
    // render();
  }, [
    player1Y,
    player2Y,
    ballX,
    ballY,
    ballVelocityX,
    ballVelocityY,
    player1Score,
    player2Score,
    modifiedAt,
    sequence,
    updatePlayingInfoHandler,
  ]);

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
