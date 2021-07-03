/*
 ** Alarm
 */

export interface IAlarm {
  content: string;
  createdAt: string;
  index: number;
  link: string;
  title: string;
  type: 'addFriend' | 'defeat' | 'win';
  userId: string;
  __typename: 'Alarm';
}

export interface IalarmMessage {
  index: number;
  title: string;
  content: string;
  alarmTime: string;
  type: 'addFriend' | 'defeat' | 'win';
  link: string;
  removeAlarmMessageHandler: (alarmIndex: number) => void;
}

export interface IchatMessage {
  // index?: string;
  type: 'message' | 'notification' | 'ownerMessage';
  chatID: string;
  message: string;
  createdAt: string;
}

export interface IchatNotification {
  chatID: string;
  message: string;
}

export interface IUser {
  nickname: string;
  totalWin: number;
  totalLose: number;
  ladderRating: number;
  ranking: number;
}

export interface IProfileSmall {
  position: 'right' | 'left';
  backgroundColor: string;
  nickname: string;
  totalWin: number;
  totalLose: number;
  ladderRating: number;
  ranking: number;
}

/*
 ** GameCard
 */

export interface PlayerInfo {
  name?: string;
  imageSrc?: string;
  ranking?: string;
  totalWin?: number;
  totalLose?: number;
  currentScore?: number;
}

export interface GameCardProps {
  playerA: PlayerInfo;
  playerB: PlayerInfo;
  startTime: Date;
}

export interface ProfileMediumProps {
  name: string;
  imageSrc: string;
  ranking: string;
  totalWin: number;
  totalLose: number;
  currentScore?: number;
}

export interface ProfileLargeProps {
  name: string;
  imageSrc: string;
  ranking: string;
  ladderScore: string;
  winningPercentage: number;
  totalWin: number;
  totalLose: number;
  reverse: boolean;
}
