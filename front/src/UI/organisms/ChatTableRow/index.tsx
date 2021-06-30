import React from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';

interface IChat {
  uuid: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  owner: string;
}

export const ChatTableRow = ({
  chat,
  rowIndex,
  chatListType,
}: {
  chat: IChat;
  rowIndex: number;
  chatListType: string;
}) => {
  const chatWithIndex = { index: rowIndex + 1, ...chat };
  const chatWithCloseButton = ['myList', 'dmList'].includes(chatListType)
    ? { ...chatWithIndex, closeButton: true }
    : chatWithIndex;
  const temp = Object.entries(chatWithCloseButton).filter((item) => !['uuid', 'type'].includes(item[0]));
  const tempLength = Object.keys(temp).length;
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
              X
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
