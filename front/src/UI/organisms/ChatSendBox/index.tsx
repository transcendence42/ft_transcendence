import { useMutation, useReactiveVar } from '@apollo/client';
import { Grid, GridItem } from '@chakra-ui/layout';
import { Button, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { currentChatVar } from '../../../apollo/apolloProvider';
import { CREATE_CHAT_LOG } from './ChatSendBoxQueries';

export const ChatSendBox = () => {
  //mutation
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const inputRef = useRef<HTMLInputElement>();
  const tempRef = useRef<HTMLInputElement>(); // TODO: 삭제 할 것.
  const currentChat = useReactiveVar(currentChatVar);
  const handleClickSend = () => {
    if (inputRef.current.value === '') {
      return;
    }
    // TODO: 삭제 할 것.
    if (!['devil', 'holee', 'jwon', 'yechoi', 'yshin'].includes(tempRef.current.value)) {
      return;
    }
    createChatLog({
      variables: {
        user: {
          // TODO: 채팅방 관련 내용으로 설정할 것
          chatUUID: currentChat,
          userID: tempRef.current.value,
          message: inputRef.current.value,
        },
      },
    }).then(() => {
      inputRef.current.value = '';
    });
  };

  const handleKeyPressInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSend();
    }
  };

  return (
    <>
      <Grid templateColumns="2fr 7fr 1fr" pt={2}>
        {/* TODO: 임시 아이디 입력칸 삭제할 것. 상기 grid template 조절할 것. */}
        <GridItem colSpan={1}>
          <Input placeholder="임시 아이디" ref={tempRef}></Input>
        </GridItem>
        <GridItem colSpan={1}>
          <Input placeholder="메시지를 입력하세요" ref={inputRef} onKeyPress={(e) => handleKeyPressInput(e)}></Input>
        </GridItem>
        <GridItem colSpan={1}>
          <Button onClick={handleClickSend}>send</Button>
        </GridItem>
      </Grid>
    </>
  );
};
