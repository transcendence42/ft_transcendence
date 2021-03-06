import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Tr, Td } from '@chakra-ui/table';
import { Box } from '@chakra-ui/react';
import { LeaveChatBox } from '../LeaveChatBox';
import { LeaveChatMsg } from '../../molecules/LeaveChatMsg';
import { LockIcon } from '../../../utils/icons';
import { currentChatVar, currentLoginIDVar } from '../../../apollo/apolloProvider';
import { CHAT_LIST_TYPE_MY_LIST, CHAT_LIST_TYPE_DM_LIST } from '../../../utils/constants';
import { CREATE_CHAT_LOG, GET_CHAT, UPDATE_CHAT } from './ChatTableRowQueries';

export const ChatTableRow = ({ ...props }) => {
  const { chat, rowIndex, chatListType, leaveChat, onOpen, setChatForCheckModal, refetchChat } = props;
  const [createChatLog] = useMutation(CREATE_CHAT_LOG);
  const [updateChat] = useMutation(UPDATE_CHAT);
  const [getChat] = useLazyQuery(GET_CHAT, {
    fetchPolicy: 'network-only',
    onCompleted: async (res) => {
      if (res.chat.type === 'private') {
        setChatForCheckModal(res.chat);
        onOpen();
      } else {
        if (!res.chat.userID.includes(loginID)) {
          await updateChat({
            variables: {
              newChat: {
                uuid: res.chat.uuid,
                userID: [...res.chat.userID, loginID],
              },
            },
          });
          await createChatLog({
            variables: {
              user: {
                userID: loginID,
                chatUUID: res.chat.uuid,
                type: 'notification',
                message: 'enter',
              },
            },
          }).catch(() => {
            return;
          });
          await refetchChat();
        }
        currentChatVar(res.chat.uuid);
      }
    },
  });

  // 로그인 ID 가져오기
  const loginID = currentLoginIDVar();

  // 비공개 방 자물쇠 아이콘
  const lockSVGIcon = chat.type === 'private' ? LockIcon({ fill: 'none' }) : null;
  // 로그인 정보를 확인하여 owner와 비교하고, alert-dialog 메시지를 다르게 부여. owner이면 메시지를 추가하고, 아니라면 없음.
  const leaveChatMsg = chat.ownerID === loginID ? <LeaveChatMsg /> : null;
  const closeButton = (
    <LeaveChatBox leaveChat={leaveChat} uuid={chat.uuid} ownerID={chat.ownerID} userID={chat.userID}>
      {leaveChatMsg}
    </LeaveChatBox>
  );

  // index 추가
  const chatWithRowIndex = { index: rowIndex + 1, ...chat };
  // 나의채팅방, 1:1 채팅방인 경우, closeButton을 추가
  const chatWithCloseButton = [CHAT_LIST_TYPE_MY_LIST, CHAT_LIST_TYPE_DM_LIST].includes(chatListType)
    ? { ...chatWithRowIndex, closeButton: true }
    : chatWithRowIndex;

  const numOfPeople = chatWithCloseButton['userID'].length;
  const filteredChatList = Object.entries(chatWithCloseButton).filter(
    (item) => !['uuid', 'type', '__typename', 'userID'].includes(item[0]),
  ); // 필수 컬럼 이외 값 필터링
  filteredChatList.splice(2, 0, ['numOfPeople', numOfPeople]); // 인원수 추가

  const handleClickChat = async () => {
    getChat({ variables: { uuid: chat.uuid } });
  };

  const resultRow = filteredChatList.map((item, i) => {
    // item[0]에는 컬럼명, item[1]에는 값이 들어감.
    if (item[0] === 'closeButton' && item[1]) {
      return <Td key={`ChatTableRow-${chatListType}-${chat.uuid}-Td-${item[0]}`}>{closeButton}</Td>;
    }
    if (i === Object.keys(filteredChatList).length - 1) {
      return <Td key={`ChatTableRow-${chatListType}-${chat.uuid}-Td-${item[0]}`}>{item[1]}</Td>;
    }
    if (item[0] === 'name') {
      return (
        <Td
          key={`ChatTableRow-${chatListType}-${chat.uuid}-Td-${item[0]}`}
          onClick={handleClickChat}
          style={{ cursor: 'pointer' }}
        >
          <Box className="chat-table-content-wrapper" display="flex" justifyContent="center">
            {item[1]}
            {lockSVGIcon}
          </Box>
        </Td>
      );
    }
    return (
      <Td key={`ChatTableRow-${chatListType}-${chat.uuid}-Td-${item[0]}`}>
        <Box className="chat-table-content-wrapper">{item[1]}</Box>
      </Td>
    );
  });

  return <Tr>{resultRow}</Tr>;
};
