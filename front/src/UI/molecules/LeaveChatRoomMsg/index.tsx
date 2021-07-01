import React from 'react';
import { Text } from '@chakra-ui/react';

export const LeaveChatRoomMsg = () => {
  return (
    <>
      <Text>회원님이 생성한 채팅방입니다.</Text>
      <Text>
        <span style={{ color: 'red', fontWeight: 'bold' }}>대화내용 및 채팅방 정보가 모두 삭제</span>
        됩니다.
      </Text>
    </>
  );
};
