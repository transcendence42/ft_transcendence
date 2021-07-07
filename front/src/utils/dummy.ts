const userData = [
  {
    id: '1234asdaf',
    nickName: 'jwon',
    userState: 'login',
  },
  {
    id: '23142dasfsdf',
    nickName: 'yshin',
    userState: 'playing',
  },
  {
    id: 'asf123223',
    nickName: 'holee',
    userState: 'playing',
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
  ladderRating: 4321,
  ranking: 2,
};

const dummyGameCardData = {
  playerA: {
    name: 'holee',
    imageSrc: '',
    ranking: '2',
    totalWin: 62,
    totalLose: 3,
    currentScore: 2,
  },
  playerB: {
    name: 'yshin',
    imageSrc: '',
    ranking: '3',
    totalWin: 63,
    totalLose: 5,
    currentScore: 4,
  },
};

const dummyChatListData = {
  myChatList: [
    {
      uuid: 'as8r2j-23rn-erw2fs-23r1',
      name: '저녁 내기 하실분?? 아무나 들어오세요.',
      type: 'public',
      numOfPeople: 2,
      owner: 'jwon',
    },
    {
      uuid: 'as8r2j-23rn-erw2fs-23r2',
      name: '점심 내기 하실분?? 아무나 들어오세요.',
      type: 'public',
      numOfPeople: 1,
      owner: 'yechoi',
    },
    {
      uuid: 'as8r2j-23rn-erw2fs-23r3',
      name: 'jwon 찾습니다',
      type: 'private',
      numOfPeople: 1,
      owner: 'yshin',
    },
    { uuid: 'as8r2j-23rn-erw2fs-23r4', name: 'title', type: 'dm', numOfPeople: 1, owner: 'holee' },
  ],
  totalChatList: [
    {
      uuid: 'as8r2j-23rn-erw2fs-23r1',
      name: '저녁 내기 하실분?? 아무나 들어오세요.',
      type: 'public',
      numOfPeople: 2,
      owner: 'jwon',
    },
    {
      uuid: 'as8r2j-23rn-erw2fs-23r2',
      name: '점심 내기 하실분?? 아무나 들어오세요.',
      type: 'public',
      numOfPeople: 1,
      owner: 'yechoi',
    },
    {
      uuid: 'as8r2j-23rn-erw2fs-23r3',
      name: 'jwon 찾습니다',
      type: 'private',
      numOfPeople: 1,
      owner: 'yshin',
    },
    { uuid: 'as8r2j-23rn-erw2fs-23r8', name: '공개채팅방1', type: 'public', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23r9', name: '공개채팅방2', type: 'public', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23ra', name: '공개채팅방3', type: 'public', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rb', name: '공개채팅방4', type: 'public', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rc', name: '비공개채팅방1', type: 'private', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rd', name: '비공개채팅방2', type: 'private', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23re', name: '비공개채팅방3', type: 'private', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rf', name: '비공개채팅방4', type: 'private', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rg', name: '공개채팅방5', type: 'public', numOfPeople: 1, owner: 'yshin' },
    { uuid: 'as8r2j-23rn-erw2fs-23rh', name: '공개채팅방6', type: 'public', numOfPeople: 1, owner: 'yshin' },
  ],
};

export { userData, messageData, dummyChatData, user, dummyGameCardData, dummyChatListData };
