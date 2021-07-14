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

const postgresTimeToDate = (timestamp: string): Date => {
  const dateTime = timestamp.substring(0, 19).split('T');
  const [year, month, date, hour, minute, second] = [...dateTime[0].split('-'), ...dateTime[1].split(':')];
  return new Date(Number(year), Number(month), Number(date), Number(hour), Number(minute), Number(second));
};

const compareTimeLapseToString = (startTimestamp: Date, endTimestamp: Date): string => {
  if (startTimestamp.getFullYear() !== endTimestamp.getFullYear()) {
    return String(startTimestamp.getFullYear() - endTimestamp.getFullYear() + '년전');
  } else if (startTimestamp.getMonth() !== endTimestamp.getMonth()) {
    return String(startTimestamp.getMonth() - endTimestamp.getMonth() + '개월전');
  } else if (startTimestamp.getDate() !== endTimestamp.getDate()) {
    return String(startTimestamp.getDate() - endTimestamp.getDate() + '일전');
  } else if (startTimestamp.getHours() !== endTimestamp.getHours()) {
    return String(startTimestamp.getHours() - endTimestamp.getHours() + '시간전');
  } else if (startTimestamp.getMinutes() !== endTimestamp.getMinutes()) {
    return String(startTimestamp.getMinutes() - endTimestamp.getMinutes() + '분전');
  } else if (startTimestamp.getSeconds() !== endTimestamp.getSeconds()) {
    return String(startTimestamp.getSeconds() - endTimestamp.getSeconds() + '초전');
  }
  return '방금전';
};

const getCookies = (key: string) => {
  const cookie = document.cookie.split(';').filter((x) => x.trim().split('=')[0] === key)[0];
  if (!cookie) {
    return '';
  }
  return cookie.split('=')[1];
};

const bearerAuthorization = (token: string) => {
  return token ? `bearer ${token}` : '';
};

export { winRate, getRunningTime, postgresTimeToDate, compareTimeLapseToString, getCookies, bearerAuthorization };
