const winRate = (totalWin: number, totalLose: number) => {
  return Math.floor((totalWin / (totalWin + totalLose)) * 100);
};

export { winRate };
