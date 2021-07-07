import React from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { LeaveChat } from '../LeaveChat';
import { LeaveChatMsg } from '../../molecules/LeaveChatMsg';
import { LockIcon } from '../../../utils/icons';
import { CHAT_LIST_TYPE_MY_LIST, CHAT_LIST_TYPE_DM_LIST } from '../../../utils/constants';

export const ChatTableRow = ({ ...props }) => {
  const { chat, rowIndex, chatListType, leaveChat } = props;
  const chatWithRowIndex = { index: rowIndex + 1, ...chat };
  const chatWithCloseButton = [CHAT_LIST_TYPE_MY_LIST, CHAT_LIST_TYPE_DM_LIST].includes(chatListType)
    ? { ...chatWithRowIndex, closeButton: true }
    : chatWithRowIndex;

  const lockSVGIcon = chat.type === 'private' ? LockIcon({ fill: 'none' }) : <></>; // 비공개 방에 자물쇠 아이콘 추가
  const numOfPeople = chatWithCloseButton['userID'].length;
  const filteredChatList = Object.entries(chatWithCloseButton).filter(
    (item) => !['uuid', 'type', '__typename', 'userID'].includes(item[0]),
  ); // 필수 컬럼 이외 값 필터링
  filteredChatList.splice(2, 0, ['numOfPeople', numOfPeople]); // 인원수 추가

  //로그인 정보를 확인하여 owner와 비교하고, alert-dialog 메시지를 다르게 부여. owner이면 메시지를 추가하고, 아니라면 없음.
  const leaveChatMsg = chat.owner === 'yshin' ? <LeaveChatMsg /> : ''; //TODO: 로그인 정보 확인(세션 등)

  return (
    <Tr>
      {filteredChatList.map((item, i) => {
        if (item[0] === 'name') {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <Box className="chat-table-content-wrapper" display="flex" justifyContent="center">
                {item[1]}
                {lockSVGIcon}
              </Box>
            </Td>
          );
        }
        if (i !== Object.keys(filteredChatList).length - 1) {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <Box className="chat-table-content-wrapper">{item[1]}</Box>
            </Td>
          );
        }
        if (item[0] === 'closeButton' && item[1]) {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <LeaveChat leaveChat={leaveChat} uuid={chat.uuid}>
                {leaveChatMsg}
              </LeaveChat>
            </Td>
          );
        } else {
          return <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>{item[1]}</Td>;
        }
      })}
    </Tr>
  );
};
