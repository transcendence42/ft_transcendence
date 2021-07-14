import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export const LeaveChatBox = ({ ...props }) => {
  const { children, leaveChat, uuid, ownerID, userID } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const handleClickDeleteChat = () => {
    leaveChat(uuid, ownerID, userID);
    onClose();
  };
  const cancelRef = React.useRef();

  return (
    <>
      <CloseIcon color="red" onClick={() => setIsOpen(true)}></CloseIcon>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              채팅방을 나가시겠습니까?
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                아니오
              </Button>
              <Button bg="#319795" color="white" onClick={() => handleClickDeleteChat()} ml={3}>
                네
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
