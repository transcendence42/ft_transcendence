import React from 'react';
import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { ChatRoomTableRow } from '../ChatRoomTableRow';

interface IChat {
  uuid: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  owner: string;
}

export const ChatRoomTable = ({ ...props }) => {
  const { chatList, columns, chatListType, startRowNum, endRowNum, leaveChatRoom } = props;
  return (
    <Table
      variant="unstyled"
      style={{
        borderCollapse: 'separate',
        borderSpacing: '0 5px',
        fontSize: '1.1rem',
      }}
    >
      <Thead>
        <Tr style={{ backgroundColor: '#EDF2F7' }}>
          {columns.map((columnName: string, i: number) => {
            return i === columns.length - 1 ? (
              <Th
                key={`ChatTable-${chatListType}-Thead-Th-${i}`}
                style={{
                  borderTop: '2px solid #4299E1',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  padding: '13px 2px',
                }}
              >
                {columnName}
              </Th>
            ) : (
              <Th
                key={`ChatTable-${chatListType}-Thead-Th-${i}`}
                style={{
                  borderTop: '2px solid #4299E1',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  padding: '13px 2px',
                }}
              >
                <Box
                  style={{
                    borderRight: '2px solid #DADADA',
                  }}
                >
                  {columnName}
                </Box>
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
              <ChatRoomTableRow
                chat={chat}
                rowIndex={startRowNum + i}
                chatListType={chatListType}
                key={`ChatTable-${chatListType}-ChatTableRow-${i}`}
                leaveChatRoom={leaveChatRoom}
              />
            );
          })}
      </Tbody>
    </Table>
  );
};
