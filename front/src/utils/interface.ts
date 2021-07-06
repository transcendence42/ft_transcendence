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

export interface IGame {
  id: number;
  isPlaying: boolean;
  playerOneID: string;
  playerOneScore: number;
  playerTwoID: string;
  playerTwoScore: number;
  createdAt: Date;
}

/*
 ** Chat
 */

export interface IChat {
  uuid: string; // PP_200_uuid
  name: string; // PP_200_name
  type: 'public' | 'private' | 'dm'; // PP_200_type
  numOfPeople: number; // DB에서 처리해서 반환
  owner: string; // PP_200_ownerID
}

export interface IDummyChatListData {
  myChatList: IChat[];
  totalChatList: IChat[];
}

/*
 ** Game
 */

export interface IPaddle {
  x: number;
  y: number;
  paddleWidth: number;
  paddleHeight: number;
  color: string;
  score: number;
}

export interface IBall {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  speed: number;
  color: string;
}
