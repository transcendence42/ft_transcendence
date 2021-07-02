import React from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { LeaveChatButton } from '../LeaveChatButton';
import { LeaveChatMsg } from '../../molecules/LeaveChatMsg';

export const ChatTableRow = ({ ...props }) => {
  const { chat, rowIndex, chatListType, leaveChat } = props;
  const chatWithRowIndex = { index: rowIndex + 1, ...chat };
  const chatWithCloseButton = ['myList', 'dmList'].includes(chatListType)
    ? { ...chatWithRowIndex, closeButton: true }
    : chatWithRowIndex;
  const lockSVG =
    chat.type === 'private' ? (
      <>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5 5.99975H11V3.49976C11 2.70411 10.6839 1.94104 10.1213 1.37844C9.55871 0.815826 8.79565 0.499756 8 0.499756C7.20435 0.499756 6.44129 0.815826 5.87868 1.37844C5.31607 1.94104 5 2.70411 5 3.49976V5.99975H4.5C3.96974 6.00033 3.46137 6.21123 3.08643 6.58618C2.71148 6.96113 2.50058 7.4695 2.5 7.99975V13.4998C2.50058 14.03 2.71148 14.5384 3.08643 14.9133C3.46137 15.2883 3.96974 15.4992 4.5 15.4998H11.5C12.0303 15.4992 12.5386 15.2883 12.9136 14.9133C13.2885 14.5384 13.4994 14.03 13.5 13.4998V7.99975C13.4994 7.4695 13.2885 6.96113 12.9136 6.58618C12.5386 6.21123 12.0303 6.00033 11.5 5.99975ZM10 5.99975H6V3.49976C6 2.96932 6.21071 2.46061 6.58579 2.08554C6.96086 1.71047 7.46957 1.49976 8 1.49976C8.53043 1.49976 9.03914 1.71047 9.41421 2.08554C9.78929 2.46061 10 2.96932 10 3.49976V5.99975Z"
            fill="black"
          />
        </svg>
      </>
    ) : (
      <></>
    );
  const temp = Object.entries(chatWithCloseButton).filter((item) => !['uuid', 'type'].includes(item[0]));
  const tempLength = Object.keys(temp).length;
  //로그인 정보를 확인하여 owner와 비교하고, alert-dialog 메시지를 다르게 부여. owner이면 메시지를 추가하고, 아니라면 없음.
  const leaveChatMsg = chat.owner === 'yshin' ? <LeaveChatMsg /> : ''; //TODO: 로그인 정보 확인(세션 등)
  const uuid = chat.uuid;
  return (
    <Tr>
      {temp.map((item, i) => {
        if (item[0] === 'name') {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <Box className="chat-table-content-wrapper" display="flex" justifyContent="center">
                {item[1]}
                {lockSVG}
              </Box>
            </Td>
          );
        }
        if (i !== tempLength - 1) {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <Box className="chat-table-content-wrapper">{item[1]}</Box>
            </Td>
          );
        }
        if (item[0] === 'closeButton' && item[1]) {
          return (
            <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>
              <LeaveChatButton leaveChat={leaveChat} uuid={uuid}>
                {leaveChatMsg}
              </LeaveChatButton>
            </Td>
          );
        } else {
          return <Td key={`ChatTableRow-${chatListType}-${i}-Td-${item[0]}`}>{item[1]}</Td>;
        }
      })}
    </Tr>
  );
};
