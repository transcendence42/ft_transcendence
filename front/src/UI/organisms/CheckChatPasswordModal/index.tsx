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
import { currentChatVar } from '../../../apollo/apolloProvider';
import { useLazyQuery } from '@apollo/client';
import { CHECK_CHAT_PASSWORD } from './CheckChatPasswordModalQueries';

export const CheckChatPasswordModal = ({ ...props }) => {
  const { isOpen, onClose, chat } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const [getSuccess, { data }] = useLazyQuery(CHECK_CHAT_PASSWORD, {
    onCompleted: () => {
      if (data.checkChatPassword) {
        setIsWrongPassword(false);
        onClose();
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
