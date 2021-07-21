import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { AlarmChatMessage } from '../../molecules';
import { GET_CURRENT_USERID } from './AlarmChatMessagesBoxQueries';

export const AlarmChatMessagesBox = ({ ...props }) => {
  const { subscribeToNewMessage, chatLog, chatIndex, chatUUID } = props;
  useEffect(() => {
    const unsubscribe = subscribeToNewMessage({
      document: chatUUID,
    });
    return () => {
      unsubscribe();
    };
  });
  // 로그인 정보 가져오기
  const { data, loading, error } = useQuery(GET_CURRENT_USERID);
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    console.log(error);
    return <>ERROR</>;
  }
  return (
    <>
      {chatLog.map(({ index, type, userID, message, createdAt }) => {
        type = type === 'notification' ? type : userID === data.me.userID ? 'ownerMessage' : 'message';
        return (
          <AlarmChatMessage
            key={`chat-room-${chatIndex}-msg-${index}`}
            type={type}
            chatID={userID}
            message={message}
            createdAt={createdAt}
          />
        );
      })}
    </>
  );
};
