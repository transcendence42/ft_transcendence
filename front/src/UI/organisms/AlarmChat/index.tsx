import React, { useState, useCallback, useEffect, useRef } from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmChatMessage } from '../../molecules';
import { PersonIcon, LockIcon } from '../../../utils/icons';
import { dummyChatData } from '../../../utils/dummy';
import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_TITLE_CONTENT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
} from '../../../utils/constants';
import './index.scss';

const useContextMenu = (outerRef: React.MutableRefObject<HTMLDivElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setXPos(`${event.pageX}px`);
      setYPos(`${event.pageY}px`);
      if (
        outerRef.current.getBoundingClientRect().top <= event.pageY &&
        outerRef.current.getBoundingClientRect().bottom >= event.pageY &&
        outerRef.current.getBoundingClientRect().left <= event.pageX &&
        outerRef.current.getBoundingClientRect().right >= event.pageX
      ) {
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.addEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { xPos, yPos, menu };
};

const Menu = ({ outerRef }: { outerRef: React.MutableRefObject<HTMLDivElement> }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);

  if (menu) {
    return (
      <ul className="menu" style={{ top: yPos, left: xPos }}>
        <li>Item1, Row: </li>
        <li>Item2 Row </li>
      </ul>
    );
  }
  return <></>;
};

export const AlarmChat = () => {
  const { chat, chatLog } = dummyChatData;
  const outerRef = useRef(null);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Menu outerRef={outerRef} />
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
                  {chat.personnel})
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
          {chatLog.map(({ index, type, chatId, message, createdAt }) => (
            <AlarmChatMessage key={index} type={type} chatID={chatId} message={message} createdAt={createdAt} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
