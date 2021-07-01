interface IChat {
  uuid: string; // PP_200_uuid
  name: string; // PP_200_name
  type: 'public' | 'private' | 'dm'; // PP_200_type
  numOfPeople: number; // DB에서 처리해서 반환
  owner: string; // PP_200_ownerID
}

interface IDummyChatListData {
  myChatList: IChat[];
  totalChatList: IChat[];
}

export const DummyChatListData: IDummyChatListData = {
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
