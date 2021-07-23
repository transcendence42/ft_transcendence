import React, { useRef, MouseEvent, useEffect } from 'react';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Menu } from '../ContextMenu';
import { AlarmChatMessagesBox } from '../AlarmChatMessagesBox';
import { ChatLogSendBox } from '../ChatLogSendBox';
import { PersonIcon, LockIcon } from '../../../utils/icons';
import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_TITLE_CONTENT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
} from '../../../utils/constants';
import { GET_CHAT, CHATLOG_SUBSCRIPTION } from './AlarmChatQueries';
import { currentChatVar } from '../../../apollo/apolloProvider';
import { EmptyChat } from '../../molecules/EmptyChat';

export const AlarmChat = () => {
  const currentChat = useReactiveVar(currentChatVar);
  const { loading, error, data, subscribeToMore } = useQuery(GET_CHAT, {
    variables: {
      uuid: currentChat,
    },
    fetchPolicy: 'network-only',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
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
    if (currentChat === '') return <EmptyChat />; // 입장한 채팅방이 없을 때
    return <>ERROR</>;
  }

  const chatLog = data.chat.chatLog.map((item) => {
    const createdDate = new Date(item.createdAt);
    const hour = createdDate.getHours();
    const min = createdDate.getMinutes() < 10 ? '0' + createdDate.getMinutes() : createdDate.getMinutes();
    const messageCreatedTime = `${hour}:${min}`;
    return {
      ...item,
      createdAt: messageCreatedTime,
    };
  });

  const subscribeToNewMessage = () => {
    return subscribeToMore({
      document: CHATLOG_SUBSCRIPTION,
      variables: { uuid: currentChat },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newFeedItem = subscriptionData.data.chatLogAdded;
        const res = Object.assign({}, prev, {
          chat: {
            chatLog: [...prev.chat.chatLog, newFeedItem],
          },
        });
        return res;
      },
    });
  };

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
        <Flex flexDirection="column" height="258px" overflowX="hidden" overflowY="auto" ref={scrollRef}>
          <AlarmChatMessagesBox
            chatLog={chatLog}
            chatIndex={data.chat.index}
            subscribeToNewMessage={subscribeToNewMessage}
            chatUUID={data.chat.uuid}
          />
        </Flex>
        <ChatLogSendBox />
      </AccordionPanel>
    </AccordionItem>
  );
};
