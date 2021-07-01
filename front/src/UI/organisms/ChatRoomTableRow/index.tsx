import React from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { LeaveChatButton } from '../LeaveChatButton';
import { LeaveChatRoomMsg } from '../../molecules/LeaveChatRoomMsg';

export const ChatRoomTableRow = ({ ...props }) => {
  const { chat, rowIndex, chatListType, leaveChatRoom } = props;
  const chatWithRowIndex = { index: rowIndex + 1, ...chat };
  const chatWithCloseButton = ['myList', 'dmList'].includes(chatListType)
    ? { ...chatWithRowIndex, closeButton: true }
    : chatWithRowIndex;
  const temp = Object.entries(chatWithCloseButton).filter((item) => !['uuid', 'type'].includes(item[0]));
  const tempLength = Object.keys(temp).length;
  //로그인 정보를 확인하여 owner와 비교하고, alert-dialog 메시지를 다르게 부여. owner이면 메시지를 추가하고, 아니라면 없음.
  const leaveChatMsg = 2 < 1 ? <LeaveChatRoomMsg /> : ''; //TODO: 로그인 정보 확인
  const uuid = chat.uuid;
  return (
    <Tr style={{ backgroundColor: '#F7FAFC' }}>
      {temp.map((item, i) => {
        if (i !== tempLength - 1) {
          return (
            <Td
              className={item[0]}
              key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}
              style={{
                textAlign: 'center',
                padding: '13px 2px',
              }}
            >
              <Box
                style={{
                  borderRight: '2px solid #DADADA',
                }}
              >
                {item[1]}
              </Box>
            </Td>
          );
        }
        if (item[0] === 'closeButton' && item[1]) {
          return (
            <Td
              key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}
              className={item[0]}
              style={{
                textAlign: 'center',
                padding: '13px 2px',
              }}
            >
              <LeaveChatButton leaveChatRoom={leaveChatRoom} uuid={uuid}>
                {leaveChatMsg}
              </LeaveChatButton>
            </Td>
          );
        } else {
          return (
            <Td
              key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}
              className={item[0]}
              style={{
                textAlign: 'center',
                padding: '13px 2px',
              }}
            >
              {item[1]}
            </Td>
          );
        }
      })}
    </Tr>
  );
};
