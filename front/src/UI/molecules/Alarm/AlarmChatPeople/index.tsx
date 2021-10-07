import React, { useRef } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ContextMenu } from 'holee-contextmenu';

import { currentChatVar, currentLoginIDVar } from '../../../../apollo/apolloProvider';
import {
  CREATE_CHAT_LOG,
  TOGGLE_BLOCK,
  TOGGLE_MUTE,
  FORCED_OUT,
  TOGGLE_ADMIN,
  CREATE_DM,
  CREATE_ALARM,
  CREATE_FOLLOW,
} from './AlarmChatPeopleQueries';

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
  const { username, ownerID, adminID, refetchChat, setChatRoomState } = props;
  const outerRef = useRef<HTMLDivElement>(null);
  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [createDM] = useMutation(CREATE_DM);
  const [createAlarm] = useMutation(CREATE_ALARM);
  const [toggleBlock] = useMutation(TOGGLE_BLOCK);
  const [toggleMute] = useMutation(TOGGLE_MUTE);
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const [forcedOut] = useMutation(FORCED_OUT);
  const [toggleAdmin] = useMutation(TOGGLE_ADMIN);
  const loginID = currentLoginIDVar();
  const currentChatUUID = useReactiveVar(currentChatVar);

  const handleAddFriend = async () => {
    await createFollow({
      variables: {
        users: {
          followerID: loginID,
          followingID: username,
        },
      },
    }).then((res) => {
      if (!res.data.createFollow.checked) {
        // 서로 친구 상태가 아닌 경우 알람 생성
        createAlarm({
          variables: {
            alarm: {
              userID: username,
              title: '친구요청',
              content: `${loginID}님이 친구 요청을 보냈습니다.`,
              type: 'addFriend',
              link: `/profile/${loginID}`,
            },
          },
        });
      }
    });
  };
  const handleSendMessage = async () => {
    await createDM({
      variables: {
        user1: loginID,
        user2: username,
      },
    }).then((res) => {
      currentChatVar(res.data.createDM.uuid);
      setChatRoomState('chat-room');
    });
    await createAlarm({
      variables: {
        alarm: {
          userID: username,
          title: 'DM',
          content: `${loginID}님이 메시지를 보내셨습니다.`,
          type: 'DM',
          link: '/chat',
        },
      },
    });
  };

  const handleRegisterAdmin = async () => {
    await toggleAdmin({
      variables: {
        uuid: currentChatUUID,
        userID: username,
      },
    }).then((res) => {
      const message = res.data.toggleAdmin.adminID.includes(username) ? 'admin' : 'un-admin';
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
  };

  const handleBlock = async () => {
    await toggleBlock({
      variables: {
        blockInput: {
          followerID: loginID,
          followingID: username,
        },
      },
    });
  };

  const handleMute = async () => {
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
  };

  const handleForcedOut = async () => {
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
  };

  const menuOnClickHandler = async (
    e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      switch (eventTarget.dataset.option) {
        case 'send-message':
          await handleSendMessage();
          break;
        case 'add-friend':
          await handleAddFriend();
          break;
        case 'play-game':
          console.log(eventTarget.dataset.option);
          break;
        case 'register-admin':
          await handleRegisterAdmin();
          break;
        case 'block':
          await handleBlock();
          break;
        case 'mute':
          await handleMute();
          break;
        case 'forced-out':
          await handleForcedOut();
          break;
        default:
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
              <Link to={'/profile/' + username}>
                <li>프로필 보기</li>
              </Link>
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
