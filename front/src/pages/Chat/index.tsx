import React from 'react';
import ChatTemplate from '../../templates/ChatTemplate';
import { dummyChatListData } from '../../utils/dummy';

const Chat: React.FC = () => {
  return <ChatTemplate myChatList={dummyChatListData.myChatList} totalChatList={dummyChatListData.totalChatList} />;
};

export default Chat;
