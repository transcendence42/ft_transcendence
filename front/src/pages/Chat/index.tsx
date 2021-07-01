import React from 'react';
import ChatTemplate from '../../templates/ChatTemplate';
import { DummyChatListData } from './DummyChatListData';

const Chat: React.FC = () => {
  return <ChatTemplate myChatList={DummyChatListData.myChatList} totalChatList={DummyChatListData.totalChatList} />;
};

export default Chat;
