import React, { useRef, useEffect } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { ContextMenu } from 'holee-contextmenu';

import { currentChatVar, currentLoginIDVar } from '../../../../apollo/apolloProvider';
import { CREATE_CHAT_LOG, TOGGLE_BLOCK, TOGGLE_MUTE, FORCED_OUT, CHATLOG_SUBSCRIPTION } from './AlarmChatPeopleQueries';

const AlarmChatPerson = ({ outerRef, username, ownerID, adminID = [] }) => {
  return (
    <div ref={outerRef}>
      {username}
      {ownerID === username ? ' 👑' : null}
      {adminID.includes(username) ? ' 🏅' : null}
    </div>
  );
};

export const AlarmChatPeople = ({ ...props }) => {
  const { username, ownerID, adminID, refetchChat, subscribeToNewMessage } = props;
  const outerRef = useRef<HTMLDivElement>(null);
  const [toggleBlock] = useMutation(TOGGLE_BLOCK);
  const [toggleMute] = useMutation(TOGGLE_MUTE);
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const [forcedOut] = useMutation(FORCED_OUT);
  const loginID = currentLoginIDVar();
  const currentChatUUID = useReactiveVar(currentChatVar);

  useEffect(() => {
    const unsubscribe = subscribeToNewMessage({
      document: CHATLOG_SUBSCRIPTION,
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToNewMessage]);

  const menuOnClickHandler = async (
    e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      switch (eventTarget.dataset.option) {
        case 'profile':
          console.log(eventTarget.dataset.option);
          break;
        case 'send-message':
          console.log(eventTarget.dataset.option);
          break;
        case 'add-friend':
          console.log(eventTarget.dataset.option);
          break;
        case 'play-game':
          console.log(eventTarget.dataset.option);
          break;
        case 'register-admin':
          console.log(eventTarget.dataset.option);
          break;
        case 'block':
          await toggleBlock({
            variables: {
              blockInput: {
                followerID: loginID,
                followingID: username,
              },
            },
          });
          break;
        case 'mute':
          await toggleMute({
            variables: {
              uuid: currentChatUUID,
              userID: username,
            },
          }).then((res) => {
            const message = res.data.toggleMute.muteID.includes(username) ? 'mute' : 'unmute';
            createChatLog({
              variables: {
                chatLog: {
                  chatUUID: currentChatUUID,
                  userID: username,
                  type: 'notification',
                  message: message,
                },
              },
            });
          });
          break;
        case 'forced-out':
          await forcedOut({
            variables: {
              uuid: currentChatUUID,
              userID: username,
            },
          });
          await createChatLog({
            variables: {
              chatLog: {
                chatUUID: currentChatUUID,
                userID: username,
                type: 'notification',
                message: 'forced-out',
              },
            },
          });
          refetchChat();
          break;
      }
    }
  };

  if (ownerID.includes(loginID)) {
    return (
      <>
        <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
          {loginID === username ? null : (
            <>
              <li data-option="profile">{username} 프로필 보기</li>
              <li data-option="send-message">메세지 보내기</li>
              <li data-option="add-friend">친구추가 요청</li>
              <li data-option="play-game">핑퐁게임 요청</li>
              <li data-option="register-admin">관리자 임명(해임)</li>
              <li data-option="block">차단(차단 해제)하기</li>
              <li data-option="mute">음소거(음소거 해제)하기</li>
              <li data-option="forced-out">강제퇴장</li>
            </>
          )}
        </ContextMenu>
        <AlarmChatPerson outerRef={outerRef} username={username} ownerID={ownerID} adminID={adminID} />
      </>
    );
  } else if (adminID.includes(loginID)) {
    return (
      <>
        <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
          {loginID === username ? null : (
            <>
              <li data-option="profile">{username} 프로필 보기</li>
              <li data-option="send-message">메세지 보내기</li>
              <li data-option="add-friend">친구추가 요청</li>
              <li data-option="play-game">핑퐁게임 요청</li>
              <li data-option="block">차단(차단 해제)하기</li>
              <li data-option="mute">음소거(음소거 해제)하기</li>
              <li data-option="forced-out">강제퇴장</li>
            </>
          )}
        </ContextMenu>
        <AlarmChatPerson outerRef={outerRef} username={username} ownerID={ownerID} adminID={adminID} />
      </>
    );
  }
  return (
    <>
      <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        {loginID === username ? null : (
          <>
            <li data-option="profile">{username} 프로필 보기</li>
            <li data-option="send-message">메세지 보내기</li>
            <li data-option="add-friend">친구추가 요청</li>
            <li data-option="play-game">핑퐁게임 요청</li>
            <li data-option="block">차단(차단 해제)하기</li>
          </>
        )}
      </ContextMenu>
      <AlarmChatPerson outerRef={outerRef} username={username} ownerID={ownerID} adminID={adminID} />
    </>
  );
};
