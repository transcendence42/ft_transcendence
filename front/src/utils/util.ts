const winRate = (totalWin: number, totalLose: number) => {
  return Math.floor((totalWin / (totalWin + totalLose)) * 100);
};

const getRunningTime = (isoStartTime: Date): string => {
  const currentTime: Date = new Date();
  const rawGameTime = currentTime.getTime() - isoStartTime.getTime();
  const min = String(Math.floor(rawGameTime / 1000 / 60));
  const sec = String(Math.floor(rawGameTime / 1000) - Number(min) * 60);
  return `${min}:${sec}`;
};

export { winRate, getRunningTime };
