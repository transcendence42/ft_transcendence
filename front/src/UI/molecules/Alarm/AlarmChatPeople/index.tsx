import React, { useRef } from 'react';
import { ContextMenu } from 'holee-contextmenu';

import { currentLoginIDVar } from '../../../../apollo/apolloProvider';

const AlarmChatPerson = ({ outerRef, username, ownerID, adminID }) => {
  return (
    <div ref={outerRef}>
      {username}
      {ownerID.includes(username) ? ' 🎖' : null}
      {adminID.includes(username) ? ' 🏅' : null}
    </div>
  );
};

export const AlarmChatPeople = ({
  username,
  ownerID,
  adminID,
}: {
  username: string;
  ownerID: string[];
  adminID: string[];
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const loginID = currentLoginIDVar();

  const menuOnClickHandler = (
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
          console.log(eventTarget.dataset.option);
          break;
        case 'mute':
          console.log(eventTarget.dataset.option);
          break;
        case 'forced-out':
          console.log(eventTarget.dataset.option);
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
              <li data-option="mute">음소거</li>
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
              <li data-option="mute">음소거</li>
              <li data-option="forced-out">강제퇴장</li>
            </>
          )}
        </ContextMenu>
        <AlarmChatPerson outerRef={outerRef} username={username} />
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
      <AlarmChatPerson outerRef={outerRef} username={username} />
    </>
  );
};
