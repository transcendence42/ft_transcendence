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
  ModalFooter,
  Grid,
  GridItem,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { UPDATE_CHAT } from './AlarmChatPasswordManageQueries';

export const AlarmChatPasswordManage = ({ ...props }) => {
  const { isOpen, onClose, chat, refetchChat } = props;
  const chatNameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const [type, setType] = useState(chat.type);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [updateChat] = useMutation(UPDATE_CHAT);

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

  const handleClickCreateButton = async () => {
    const password = type === 'public' ? '' : passwordInputRef.current.value;
    if (!validatePassword(password)) {
      return;
    }
    await updateChat({
      variables: {
        chat: {
          uuid: chat.uuid,
          type: type,
          password: password,
        },
      },
    });
    await refetchChat();
    onClose();
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
      <Modal initialFocusRef={chatNameInputRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!isValidPassword}>
              <Grid templateAreas="1fr 1fr / 1fr 1fr 1fr" mt={3}>
                <GridItem colSpan={1}>
                  <FormLabel>비밀번호 변경</FormLabel>
                </GridItem>
                <GridItem colSpan={1} justify="right">
                  <RadioGroup defaultValue={chat.type}>
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
                    placeholder="비밀번호를 입력하세요"
                    disabled={chat.type === 'public' ? true : false}
                    ref={passwordInputRef}
                    onChange={(e) => {
                      handleChangePassword(e);
                    }}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormHelperText>숫자만 입력 가능</FormHelperText>
                  <FormErrorMessage>비밀번호가 올바르지 않습니다</FormErrorMessage>
                </GridItem>
              </Grid>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg="#319795" color="white" mr={3} onClick={handleClickCreateButton}>
              적용
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
