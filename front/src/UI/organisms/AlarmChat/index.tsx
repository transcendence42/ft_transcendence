import React, { useRef, MouseEvent, useEffect, useState } from 'react';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { ContextMenu } from 'holee-contextmenu';

import { AlarmChatPeople } from '../../molecules';
import { AlarmChatMessagesBox } from '../AlarmChatMessagesBox';
import { ChatLogSendBox } from '../ChatLogSendBox';
import { PersonIcon, LockIcon } from '../../../utils/icons';
import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_TITLE_CONTENT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
  ALARM_CHAT_BOX_HEIGHT,
  EMPTY_CHAT_UUID,
} from '../../../utils/constants';
import { GET_CHAT, CHATLOG_SUBSCRIPTION } from './AlarmChatQueries';
import { currentChatVar } from '../../../apollo/apolloProvider';
import { EmptyChat } from '../../molecules/EmptyChat';

export const AlarmChat = () => {
  const [chatRoomState, setChatRoomState] = useState<string>('chat-room');
  const currentChat = useReactiveVar(currentChatVar);
  const { loading, error, data, subscribeToMore, refetch } = useQuery(GET_CHAT, {
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
      setChatRoomState(eventTarget.dataset.option as string);
      refetch();
    }
  };

  if (loading) {
    return <>LOADING...</>;
  }
  if (error) {
    if (currentChat === EMPTY_CHAT_UUID) return <EmptyChat />; // 입장한 채팅방이 없을 때
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
            <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
              <li data-option="chat-room">채팅창</li>
              <li data-option="chat-people-room">채팅 인원창</li>
            </ContextMenu>
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
        {chatRoomState === 'chat-room' ? (
          <>
            <Flex
              flexDirection="column"
              height={ALARM_CHAT_BOX_HEIGHT}
              overflowX="hidden"
              overflowY="auto"
              ref={scrollRef}
            >
              <AlarmChatMessagesBox
                chatLog={chatLog}
                chatIndex={data.chat.index}
                subscribeToNewMessage={subscribeToNewMessage}
                chatUUID={data.chat.uuid}
              />
            </Flex>
            <ChatLogSendBox muteIDList={data.chat.muteID} />
          </>
        ) : (
          <>
            {data.chat.userID.map((username) => (
              <AlarmChatPeople
                key={username}
                ownerID={data.chat.ownerID}
                adminID={data.chat.adminID}
                username={username}
                refetchChat={refetch}
                subscribeToNewMessage={subscribeToNewMessage}
              />
            ))}
          </>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
