import React, { useRef, useEffect, useState } from 'react';

import './index.scss';
import { drawRect, drawNet, drawCircle } from './utils';

const CrazyPong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userPaddle, setUserPaddle] = useState({
    x: 0,
    y: 0,
    width: 10,
    height: 100,
    color: 'white',
    score: 0,
  });
  const [comPaddle, setComPaddle] = useState({
    x: 0,
    y: 0,
    width: 10,
    height: 100,
    color: 'white',
    score: 0,
  });
  const [ball, setBall] = useState({
    x: 0,
    y: 0,
    radius: 10,
    color: 'white',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      canvas.width = 900;
      canvas.height = 500;
      setUserPaddle((prev) => ({ ...prev, y: canvas.height / 2 - 50 }));
      setComPaddle((prev) => ({ ...prev, x: canvas.width - 10, y: canvas.height / 2 - 50 }));
      setBall((prev) => ({ ...prev, x: canvas.width / 2, y: canvas.height / 2 }));
      drawRect(ctx, userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color);
      drawRect(ctx, comPaddle.x, comPaddle.y, comPaddle.width, comPaddle.height, comPaddle.color);
      drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
      drawNet(ctx, canvas.width, canvas.height);
    }
  }, [userPaddle.x, userPaddle.y, comPaddle.x, comPaddle.y, ball.x, ball.y]);
  return <canvas ref={canvasRef} className="canvas"></canvas>;
};

export default CrazyPong;
