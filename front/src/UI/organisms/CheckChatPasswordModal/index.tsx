import React, { useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { currentChatVar, currentLoginIDVar } from '../../../apollo/apolloProvider';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CHECK_CHAT_PASSWORD, CREATE_CHAT_LOG, UPDATE_CHAT } from './CheckChatPasswordModalQueries';

export const CheckChatPasswordModal = ({ ...props }) => {
  const { isOpen, onClose, chat, refetchChat } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const [updateChat] = useMutation(UPDATE_CHAT);

  // 로그인 ID 가져오기
  const loginID = currentLoginIDVar();

  const [getSuccess, { data }] = useLazyQuery(CHECK_CHAT_PASSWORD, {
    fetchPolicy: 'network-only',
    onCompleted: async () => {
      if (data.checkChatPassword === true) {
        setIsWrongPassword(false);
        onClose();
        if (!chat.userID.includes(loginID)) {
          await createChatLog({
            variables: {
              user: {
                userID: loginID,
                chatUUID: chat.uuid,
                type: 'notification',
                message: 'enter',
              },
            },
          });
          await updateChat({
            variables: {
              newChat: {
                uuid: chat.uuid,
                userID: [...chat.userID, loginID],
              },
            },
          });
          await refetchChat();
        }
        currentChatVar(chat.uuid);
      } else {
        setIsWrongPassword(true);
      }
    },
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  };
  const checkPassword = () => {
    getSuccess({ variables: { uuid: chat.uuid, password: inputRef.current.value } });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비공개 채팅방</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isWrongPassword}>
            <FormLabel>비밀번호</FormLabel>
            <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
            <Input type="password" ref={inputRef} onKeyPress={(e) => handleKeyPress(e)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={checkPassword}>
            입장
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
