import React from 'react';
import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { ChatTableRow } from '../ChatTableRow';
import { IChat } from '../../../utils/interface';
import './index.scss';

export const ChatTable = ({ ...props }) => {
  const { chatList, chatListColumns, chatListType, startRowNum, endRowNum, leaveChat } = props;
  return (
    // borderCollapse와 borderSpacing은 scss에서 적용되지 않아 아래의 style에서 정의함.
    <Table
      className={'chat-list-table-' + chatListType}
      variant="unstyled"
      style={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}
    >
      <Thead>
        <Tr>
          {chatListColumns.map((columnName: string, i: number) => {
            return i === chatListColumns.length - 1 ? (
              <Th key={`ChatTable-${chatListType}-Thead-Th-${i}`}>{columnName}</Th>
            ) : (
              <Th key={`ChatTable-${chatListType}-Thead-Th-${i}`}>
                <Box className="chat-table-content-wrapper">{columnName}</Box>
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {chatList
          .filter((_: IChat, i: number) => i >= startRowNum && i < endRowNum)
          .map((chat: IChat, i: number) => {
            return (
              <ChatTableRow
                chat={chat}
                rowIndex={startRowNum + i}
                chatListType={chatListType}
                key={`ChatTable-${chatListType}-ChatTableRow-${i}`}
                leaveChat={leaveChat}
              />
            );
          })}
      </Tbody>
    </Table>
  );
};
