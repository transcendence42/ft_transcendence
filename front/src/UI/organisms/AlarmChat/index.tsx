import React, { useRef, MouseEvent, useEffect } from 'react';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { Menu } from '../ContextMenu';
import { AlarmChatMessagesBox } from '../AlarmChatMessagesBox';
import { ChatSendBox } from '../ChatSendBox';

import { PersonIcon, LockIcon } from '../../../utils/icons';
import { compareTimeLapseToString, postgresTimeToDate } from '../../../utils/util';

import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_TITLE_CONTENT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
} from '../../../utils/constants';
import { GET_CHAT, CHATLOG_SUBSCRIPTION } from './AlarmChatQueries';

export const AlarmChat = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_CHAT, {
    variables: {
      uuid: 'e2d3dc39-0ca2-40f2-a890-ea18818aa049', //TODO: chat 목록에서 누른 값으로 변경할 것
    },
  });

  // subscription으로 데이터가 들어오면 스크롤을 아래로 이동
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current !== undefined) {
      scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight);
    }
  }, [data]);

  const outerRef = useRef(null);

  const menuOnClickHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      console.log(eventTarget.dataset.option);
    }
  };

  if (loading) {
    return <>LOADING...</>;
  }
  if (error) {
    console.error(error);
    return <>ERROR</>;
  }
  if (data === undefined) {
    return <>ERROR</>;
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
                  #{data.chat.index} {data.chat.name} (
                </Text>
                <Box pr="1">
                  <PersonIcon />
                </Box>
                <Text fontSize={ALARM_CHAT_TITLE_CONTENT_FONTSIZE} fontWeight={ALARM_CONTENT_FONTWEIGHT}>
                  {data.chat.userID.length})
                </Text>
                {data.chat.type === 'private' ? (
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
        <Flex
          flexDirection="column"
          overflowX="hidden"
          overflowY="auto"
          height="258px"
          style={{ scrollbarWidth: 'thin' }}
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              width: '5px',
              background: 'lightgray',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '24px',
            },
          }}
          ref={scrollRef}
        >
          <AlarmChatMessagesBox
            chatLog={data.chat.chatLog.map((item) => {
              return {
                ...item,
                createdAt: compareTimeLapseToString(new Date(), postgresTimeToDate(item.createdAt)),
              };
            })}
            chatIndex={data.chat.index}
            subscribeToNewMessage={() =>
              subscribeToMore({
                document: CHATLOG_SUBSCRIPTION,
                variables: { uuid: 'e2d3dc39-0ca2-40f2-a890-ea18818aa049' }, //TODO: uuid session 바꿀것.
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newFeedItem = subscriptionData.data.chatLogAdded;
                  const res = Object.assign({}, prev, {
                    chat: {
                      chatLog: [...prev.chat.chatLog, newFeedItem],
                    },
                  });
                  return res;
                },
              })
            }
          />
        </Flex>
        <ChatSendBox />
      </AccordionPanel>
    </AccordionItem>
  );
};
