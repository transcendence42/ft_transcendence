import React, { useRef, MouseEvent } from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { Menu } from '../ContextMenu';
import { AlarmChatMessage } from '../../molecules';
import { PersonIcon, LockIcon } from '../../../utils/icons';
import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_TITLE_CONTENT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
} from '../../../utils/constants';
import { gql, useQuery, useSubscription } from '@apollo/client';

export const AlarmChat = () => {
  const GET_CHATS = gql`
    query GetChat($uuid: String!) {
      chat(uuid: $uuid) {
        index
        uuid
        name
        type
        ownerID
        adminID
        userID
        chatLog {
          index
          userID
          message
          createdAt
        }
      }
    }
  `;
  const CHAT_SUBSCRIPTION = gql`
    subscription onChatLogAdded($userID: String!) {
      chatLogAdded(userID: $userID) {
        index
        chatUUID
        userID
        message
        createdAt
      }
    }
  `;
  const { data: da, loading: lo } = useSubscription(CHAT_SUBSCRIPTION, {
    variables: { userID: 'yshin' },
  });
  if (!lo) {
    console.log('loading_subscription: ', da);
  }
  const { loading, error, data } = useQuery(GET_CHATS, {
    variables: {
      uuid: '6803c039-c536-44cd-a4ba-44826ab9df91', //TODO: chat 목록에서 누른 값으로 변경할 것
    },
  });

  const outerRef = useRef(null);

  const menuOnClickHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      console.log(eventTarget.dataset.option);
    }
  };

  if (loading) return <>LOADING...</>;
  if (error) return <>ERROR</>;
  let chat;
  let chatLog;
  if (data !== undefined) {
    chat = data.chat;
    chatLog = chat.chatLog;
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Menu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
              <li data-option="profile">프로필 보기</li>
              <li data-option="send-message">메세지 보내기</li>
              <li data-option="add-friend">친구추가 요청</li>
              <li data-option="game-pong">핑퐁게임 요청</li>
              <li data-option="register-admin">관리자 임명(해임)</li>
              <li data-option="block">차단(차단 해제)하기</li>
              <li data-option="mute">음소거</li>
              <li data-option="forced-out">강제퇴장</li>
            </Menu>
            <Flex ref={outerRef} flexDirection="row" alignItems="center">
              <Text fontWeight={ALARM_TITLE_FONTWEIGHT} fontSize={ALARM_TITLE_FONTSIZE}>
                채팅
              </Text>
              <Flex flexDirection="row" alignItems="center">
                <Text pl="2" fontSize={ALARM_CHAT_TITLE_CONTENT_FONTSIZE} fontWeight={ALARM_CONTENT_FONTWEIGHT}>
                  #{chat.index} {chat.name} (
                </Text>
                <Box pr="1">
                  <PersonIcon />
                </Box>
                <Text fontSize={ALARM_CHAT_TITLE_CONTENT_FONTSIZE} fontWeight={ALARM_CONTENT_FONTWEIGHT}>
                  {chat.userID.length})
                </Text>
                {chat.type === 'private' ? (
                  <Box pl="2">
                    <LockIcon />
                  </Box>
                ) : (
                  ''
                )}
              </Flex>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel pb={4} bg={ALARM_BACKGROUND_COLOR}>
        <Flex flexDirection="column">
          {chatLog.map(({ index, type, userID, message, createdAt }) => {
            type = type === 'notification' ? type : userID === 'yshin' ? 'ownerMessage' : 'message'; // TODO: 'yshin' session 변경
            return (
              <AlarmChatMessage
                key={`chat-room-${chat.index}-msg-${index}`}
                type={type}
                chatID={userID}
                message={message}
                createdAt={createdAt}
              />
            );
          })}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
