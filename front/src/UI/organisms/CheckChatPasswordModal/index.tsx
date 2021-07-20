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

export const CheckChatPasswordModal = ({ ...props }) => {
  const { isOpen, onClose, uuid } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  };
  const checkPassword = () => {
    const query = `query CheckChatPassword($uuid:String!, $password:String!) {
      checkChatPassword(uuid:$uuid, password:$password)
    }`;
    const password = inputRef.current?.value;

    fetch('http://localhost:5500/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { uuid, password },
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.data.checkChatPassword === true) {
          setIsWrongPassword(false);
          onClose();
          currentChatVar(uuid);
        } else {
          setIsWrongPassword(true);
        }
      });
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
