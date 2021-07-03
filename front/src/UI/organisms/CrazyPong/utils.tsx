const drawRect = (ctx: CanvasRenderingContext2D | null, x: number, y: number, w: number, h: number, color: string) => {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
};

const drawNet = (ctx: CanvasRenderingContext2D | null, width: number, height: number) => {
  for (let i = 0; i <= height; i += 35) {
    drawRect(ctx, width / 2 - 1, i, 2, 15, 'white');
  }
};

const drawCircle = (ctx: CanvasRenderingContext2D | null, x: number, y: number, r: number, color: string) => {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
};

// const drawText = (ctx, text, x, y, color) => {
//   ctx.fillStyle = color;
//   ctx.fillfont = '75px fantasy';
//   ctx.fillText(text, x, y);
// };

export { drawRect, drawNet, drawCircle };
