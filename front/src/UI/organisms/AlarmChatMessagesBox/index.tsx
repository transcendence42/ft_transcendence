import { useEffect } from 'react';
import { AlarmChatMessage } from '../../molecules';

export const AlarmChatMessagesBox = ({ ...props }) => {
  const { subscribeToNewMessage, chatLog, chatIndex } = props;
  useEffect(() => {
    subscribeToNewMessage();
  }, []); // deps를 빈 배열로 설정하면 componentDidMount와 같은 효과를 냄. deps를 두지 않으면 componentDidMount, componentDidUpdate 효과를 내어 동작에 이상이 생김.
  // useEffect의 의존성에 대한 경고 메시지를 피하기 위해 deps에 subscribeToNewMessage를 추가하면 subscription이 더미로 생성됨.
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
