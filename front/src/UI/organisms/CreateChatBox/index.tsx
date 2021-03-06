import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ModalFooter,
  Grid,
  GridItem,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react';
import { CHAT_INVALID_NAME_ERROR_MSG, CHAT_INVALID_PASSWORD_ERROR_MSG } from '../../../utils/constants';

export const CreateChatBox = ({ ...props }) => {
  const { createChat } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const chatNameInputRef = React.useRef<HTMLInputElement>(null);

  const [type, setType] = useState('public');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const handleClickOption = (event: ChangeEvent<HTMLOptionElement>) => {
    setType(event.target.value);
    if (event.target.value === 'public') {
      passwordInputRef.current.disabled = true;
      passwordInputRef.current.value = '';
      setIsValidPassword(true);
    } else {
      passwordInputRef.current.disabled = false;
    }
  };

  const handleClickCreateButton = () => {
    const name = chatNameInputRef.current.value;
    const password = type === 'public' ? '' : passwordInputRef.current.value;
    if (!(validateName(name) && validatePassword(password))) {
      return;
    }
    createChat({ name: name, type: type, password: password });
    onClose();
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    validateName(name);
  };

  const validateName = (value: string) => {
    if (!value || value.trim() === '' || value.search(/[^a-zA-Z0-9ㄱ-ㅎ가-힣 ]/g) !== -1) {
      setIsValidName(false);
      return false;
    }
    setIsValidName(true);
    return true;
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    validatePassword(password);
  };

  const validatePassword = (value: string) => {
    if (type === 'public') {
      return true;
    }
    if (!value || value === '' || value.search(/[^\d]/g) !== -1) {
      setIsValidPassword(false);
      return false;
    }
    setIsValidPassword(true);
    return true;
  };

  return (
    <>
      <Button bg="#319795" color="white" onClick={onOpen}>
        채팅방 생성
      </Button>

      <Modal initialFocusRef={chatNameInputRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!isValidName}>
              <Grid templateAreas="1fr 1fr / 1fr 1fr 1fr" mt={3}>
                <GridItem colSpan={1}>
                  <FormLabel>채팅방 이름</FormLabel>
                </GridItem>
                <GridItem colSpan={1} justify="right">
                  <RadioGroup defaultValue="public">
                    <HStack spacing="24px" justify="center">
                      <Radio onChange={(e) => handleClickOption(e)} value="public" isInvalid={false}>
                        공개
                      </Radio>
                      <Radio onChange={(e) => handleClickOption(e)} value="private" isInvalid={false}>
                        비공개
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    ref={chatNameInputRef}
                    placeholder="채팅방 이름을 입력하세요."
                    onChange={(e) => {
                      handleChangeName(e);
                    }}
                    maxLength={20}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormHelperText>공백, 한글, 영문, 숫자 20자 이내</FormHelperText>
                  <FormErrorMessage>{CHAT_INVALID_NAME_ERROR_MSG}</FormErrorMessage>
                </GridItem>
              </Grid>
            </FormControl>

            <FormControl mt={4} isInvalid={!isValidPassword}>
              <FormLabel>비밀번호</FormLabel>
              <Input
                placeholder="비밀번호를 입력하세요"
                disabled
                ref={passwordInputRef}
                onChange={(e) => {
                  handleChangePassword(e);
                }}
              />
              <FormHelperText>숫자만 입력 가능</FormHelperText>
              <FormErrorMessage>{CHAT_INVALID_PASSWORD_ERROR_MSG}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg="#319795" color="white" mr={3} onClick={handleClickCreateButton}>
              채팅방 생성
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
