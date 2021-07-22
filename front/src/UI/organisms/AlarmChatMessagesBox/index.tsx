import React, { useEffect } from 'react';
import { currentLoginIDVar } from '../../../apollo/apolloProvider';
import { AlarmChatMessage } from '../../molecules';
import { CHATLOG_SUBSCRIPTION } from './AlarmChatMessagesBoxQueries';

export const AlarmChatMessagesBox = ({ ...props }) => {
  const { subscribeToNewMessage, chatLog, chatIndex } = props;
  useEffect(() => {
    const unsubscribe = subscribeToNewMessage({
      document: CHATLOG_SUBSCRIPTION,
    });
    return () => {
      unsubscribe();
    };
  });
  // 로그인 ID 가져오기
  const loginID = currentLoginIDVar();
  return (
    <>
      {chatLog.map(({ index, type, userID, message, createdAt }) => {
        const filteredType = type === 'notification' ? type : userID === loginID ? 'ownerMessage' : 'message';
        return (
          <AlarmChatMessage
            key={`chat-room-${chatIndex}-msg-${index}`}
            type={filteredType}
            chatID={userID}
            message={message}
            createdAt={createdAt}
          />
        );
      })}
    </>
  );
};
