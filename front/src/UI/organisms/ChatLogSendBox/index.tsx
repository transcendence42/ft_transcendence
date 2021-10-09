import { useMutation, useReactiveVar } from '@apollo/client';
import { Grid, GridItem } from '@chakra-ui/layout';
import { Button, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { currentChatVar, currentLoginIDVar } from '../../../apollo/apolloProvider';
import { CREATE_CHAT_LOG } from './ChatLogSendBoxQueries';

export const ChatLogSendBox = ({ ...props }) => {
  const { muteIDList } = props;
  //mutation
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const inputRef = useRef<HTMLInputElement>();
  const currentChat = useReactiveVar(currentChatVar);

  // 로그인 ID 가져오기
  const loginID = currentLoginIDVar();
  const handleClickSend = async () => {
    if (inputRef.current.value === '') {
      return;
    }
    if (muteIDList.includes(loginID)) {
      inputRef.current.value = '';
      return;
    }
    await createChatLog({
      variables: {
        user: {
          chatUUID: currentChat,
          userID: loginID,
          message: inputRef.current.value,
          type: 'message',
        },
      },
    })
      .then(() => {
        inputRef.current.value = '';
      })
      .catch((err) => {
        return;
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
        <GridItem colSpan={2}>
          <Input placeholder="메시지를 입력하세요" ref={inputRef} onKeyPress={(e) => handleKeyPressInput(e)}></Input>
        </GridItem>
        <GridItem colSpan={1}>
          <Button onClick={handleClickSend}>send</Button>
        </GridItem>
      </Grid>
    </>
  );
};
