import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { currentLoginIDVar } from '../../../apollo/apolloProvider';
import { AlarmChatMessage } from '../../molecules';
import { CHATLOG_SUBSCRIPTION, GET_CURRENT_USER } from './AlarmChatMessagesBoxQueries';

export const AlarmChatMessagesBox = ({ ...props }) => {
  const { subscribeToNewMessage, chatLog, chatIndex } = props;
  const { loading, error, data } = useQuery(GET_CURRENT_USER); // block ID 조회용 쿼리

  useEffect(() => {
    const unsubscribe = subscribeToNewMessage({
      document: CHATLOG_SUBSCRIPTION,
    });
    return () => {
      unsubscribe();
    };
  });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>ERROR</>;
  }
  // 로그인 ID 가져오기
  const loginID = currentLoginIDVar();

  //block ID 필터링
  const blockedIDList = data.me.followings.map((item) => {
    if (item.blocked === true) {
      return item.following.userID;
    }
    return null;
  });
  const filteredChatLogs = chatLog.filter((item) => {
    return !blockedIDList.includes(item.userID);
  });
  return (
    <>
      {filteredChatLogs.map(({ index, type, userID, message, createdAt }) => {
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
