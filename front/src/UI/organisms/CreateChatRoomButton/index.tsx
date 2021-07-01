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
} from '@chakra-ui/react';

export const CreateChatRoomButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [chatRoomState, setChatRoomState] = useState('public');

  const passwordLabelRef = React.useRef();
  const passwordInputRef = React.useRef();

  const handleClickRadioButton = (event: ChangeEvent<HTMLOptionElement>) => {
    console.log(chatRoomState);
    setChatRoomState(event.target.value);
  };
  return (
    <>
      <Button bg="#319795" color="white" onClick={onOpen}>
        채팅방 생성
      </Button>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <Grid templateAreas="1fr 1fr / 1fr 1fr 1fr" mt={3}>
                <GridItem colSpan={1}>
                  <FormLabel>채팅방 이름</FormLabel>
                </GridItem>
                <GridItem colSpan={1} justify="right">
                  <RadioGroup defaultValue="public">
                    <HStack spacing="24px" justify="center">
                      <Radio onChange={(e) => handleClickRadioButton(e)} value="public">
                        공개
                      </Radio>
                      <Radio onChange={(e) => handleClickRadioButton(e)} value="private">
                        비공개
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>
                <GridItem colSpan={2}>
                  <Input ref={initialRef} placeholder="채팅방 이름을 입력하세요." />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormHelperText>한글, 영문, 숫자 20자 이내</FormHelperText>
                </GridItem>
              </Grid>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel disabled ref={passwordLabelRef}>
                비밀번호
              </FormLabel>
              <Input placeholder="비밀번호를 입력하세요" disabled ref={passwordInputRef} />
              <FormHelperText>숫자만 입력 가능</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg="#319795" color="white" mr={3}>
              채팅방 생성
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
