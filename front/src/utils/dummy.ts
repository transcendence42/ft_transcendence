const userData = [
  {
    id: '1234asdaf',
    nickName: 'jwon',
    userState: 'login',
  },
  {
    id: '23142dasfsdf',
    nickName: 'yshin',
    userState: 'pending',
  },
  {
    id: 'asf123223',
    nickName: 'holee',
    userState: 'pending',
  },
  {
    id: 'hfdgf2323',
    nickName: '42_Dall',
    userState: 'logout',
  },
];

const messageData = [
  {
    id: '123412a',
    title: '친구요청',
    content: '42_Dall 님이 친구 요청을 보냈습니다.',
    alarmTime: '1시간전',
  },
  {
    id: '3242323a',
    title: '게임패배',
    content: 'jwon 님과 경기에서 패배했습니다.',
    alarmTime: '1시간전',
  },
  {
    id: '12334a',
    title: '게임승리',
    content: 'Polarbear 님과 경기에서 승리했습니다.',
    alarmTime: '1시간전',
  },
];

// mute, enter

const dummyChatData = {
  chat: {
    index: '3',
    type: 'private',
    name: '비공개방입니다',
    personnel: '8',
  },
  chatLog: [
    {
      index: '1',
      type: 'message',
      chatId: 'jwon',
      message: '반가워요 ㅋㅋㅋ',
      createdAt: '15:23',
    },
    {
      index: '6',
      type: 'notification',
      chatId: 'jwon',
      message: 'mute',
      createdAt: '15:23',
    },
    {
      index: '7',
      type: 'notification',
      chatId: 'holee',
      message: 'enter',
      createdAt: '15:23',
    },
    {
      index: '2',
      type: 'message',
      chatId: 'holee',
      message: '잘 지내셨어요??',
      createdAt: '15:23',
    },
    {
      index: '3',
      type: 'message',
      chatId: 'holee',
      message: '좋은 아침입니다.',
      createdAt: '15:23',
    },
    {
      index: '4',
      type: 'message',
      chatId: 'yshin',
      message: '반갑습니다',
      createdAt: '15:23',
    },
    {
      index: '5',
      type: 'ownerMessage',
      chatId: 'yechoi',
      message: '안녕하세요 :)',
      createdAt: '15:23',
    },
  ],
};

const user = {
  nickname: 'yechoi',
  totalWin: 72,
  totalLose: 78,
  radderRating: 4321,
  ranking: 2,
};

export { userData, messageData, dummyChatData, user };
