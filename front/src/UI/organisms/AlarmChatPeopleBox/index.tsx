import React, { useEffect } from 'react';
import { AlarmChatPeople } from '../../molecules';
import { CHATLOG_SUBSCRIPTION } from './AlarmChatPeopleBoxQueries';

export const AlarmChatPeopleBox = ({ ...props }) => {
  const { chat, refetchChat, subscribeToNewMessage, setChatRoomState } = props;
  useEffect(() => {
    const unsubscribe = subscribeToNewMessage({
      document: CHATLOG_SUBSCRIPTION,
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToNewMessage]);
  return (
    <>
      {chat.userID.map((username) => (
        <AlarmChatPeople
          key={username}
          ownerID={chat.ownerID}
          adminID={chat.adminID}
          username={username}
          refetchChat={refetchChat}
          setChatRoomState={setChatRoomState}
        />
      ))}
    </>
  );
};
