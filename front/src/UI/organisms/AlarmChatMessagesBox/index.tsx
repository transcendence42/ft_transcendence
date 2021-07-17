import { useEffect } from 'react';
import { AlarmChatMessage } from '../../molecules';

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
  return (
    <>
      {chatLog.map(({ index, type, userID, message, createdAt }) => {
        type = type === 'notification' ? type : userID === 'yshin' ? 'ownerMessage' : 'message'; // TODO: 'yshin' session 변경
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
