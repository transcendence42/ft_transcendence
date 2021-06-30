import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmUser } from '../../atoms/AlarmUser';

const userData = [
  {
    id: '1234asdaf',
    nickName: 'jwon',
    userState: 'login',
  },
  {
    id: '23142dasfsdf',
    nickName: 'yshin',
    userState: 'pending',
  },
  {
    id: 'asf123223',
    nickName: 'holee',
    userState: 'pending',
  },
  {
    id: 'hfdgf2323',
    nickName: '42_Dall',
    userState: 'logout',
  },
];

export const AlarmUserList = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex alignItems="center">
              <Text fontWeight="bold" fontSize="1rem">
                친구목록
              </Text>
              <Text pl="2" fontWeight="semibold" fontSize="12">{`(${
                userData.filter(({ userState }) => userState !== 'logout').length
              }/${userData.length})`}</Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pb={2} pt={1} bg="gray.50">
        {userData.map(({ id, nickName, userState }) => {
          return <AlarmUser key={id} nickName={nickName} userState={userState} />;
        })}
      </AccordionPanel>
    </AccordionItem>
  );
};
