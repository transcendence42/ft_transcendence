import React from 'react';
import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { ChatTableRow } from '../ChatTableRow';

interface IChat {
  uuid: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  owner: string;
}

export const ChatTable = ({
  chatList,
  columns,
  chatListType,
  startRowNum,
  endRowNum,
  exitChat,
}: {
  chatList: IChat[];
  columns: string[];
  chatListType: string;
  startRowNum: number;
  endRowNum: number;
  exitChat: (uuid: string) => void;
}) => {
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
          {columns.map((columnName, i) => {
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
          .filter((_, i) => i >= startRowNum && i < endRowNum)
          .map((chat, i) => {
            return (
              <ChatTableRow
                chat={chat}
                rowIndex={i}
                chatListType={chatListType}
                key={`ChatTable-${chatListType}-ChatTableRow-${i}`}
                exitChat={exitChat}
              />
            );
          })}
      </Tbody>
    </Table>
  );
};
