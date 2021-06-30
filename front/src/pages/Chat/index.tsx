import React from 'react';
import ChatTemplate from '../../templates/Chat';
import { DummyChatListData } from './DummyChatListData';

const Chat: React.FC = () => {
  return <ChatTemplate myChatList={DummyChatListData.myChatList} chatList={DummyChatListData.chatList} />;
};

export default Chat;
