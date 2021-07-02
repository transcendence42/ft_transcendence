import React from 'react';
import { Text } from '@chakra-ui/react';
import './index.scss';

export const LeaveChatMsg = () => {
  return (
    <>
      <Text>회원님이 생성한 채팅방입니다.</Text>
      <Text>
        <span className="leave-chat-warning-msg">대화내용 및 채팅방 정보가 모두 삭제</span>
        됩니다.
      </Text>
    </>
  );
};
