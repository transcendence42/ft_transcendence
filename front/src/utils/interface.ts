/*
 ** Alarm
 */

export interface IalarmMessage {
  title: string;
  content: string;
  alarmTime: string;
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
