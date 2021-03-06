import React, { useState, useEffect, ChangeEvent } from 'react';
import { GridItem, Grid, ButtonProps, Tabs, Spinner } from '@chakra-ui/react';
import { Paginator, PageGroup, usePaginator } from 'chakra-paginator';
import { useQuery, useMutation } from '@apollo/client';

import { ChatTable } from '../ChatTable';
import { CreateChatBox } from '../CreateChatBox';
import { ChatTabList } from '../../../UI/organisms/ChatTabList';

import {
  CHAT_PAGE_OUTER_LIMIT,
  CHAT_PAGE_INNER_LIMIT,
  CHAT_PAGE_SIZE,
  CHAT_DEFAULT_PAGE,
  EMPTY_CHAT_UUID,
} from '../../../utils/constants';
import { CREATE_CHAT, CREATE_CHAT_LOG, GET_CHATS, UPDATE_CHAT } from './ChatPanelQueries';
import { currentChatVar, currentLoginIDVar } from '../../../apollo/apolloProvider';

export const ChatPanel = ({ ...props }) => {
  // paginator styles
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: 'sm',
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'green.300',
    },
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'blue.300',
    },
    bg: 'green.300',
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'gray.200',
  };

  //props
  const { chatListColumns, chatListType, chatListTabs, userID } = props;
  const loginID = currentLoginIDVar();

  // react hooks
  const [chatsTotal, setChatsTotal] = useState<number | undefined>();

  // paginator variables
  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: chatsTotal,
    initialState: {
      pageSize: CHAT_PAGE_SIZE,
      currentPage: CHAT_DEFAULT_PAGE,
      isDisabled: false,
    },
  });

  // query
  const { loading, error, data, refetch } = useQuery(GET_CHATS, {
    variables: { userID: userID, type: chatListTabs[0].type, page: CHAT_DEFAULT_PAGE },
    nextFetchPolicy: 'network-only',
  });

  //mutation
  const [updateChat] = useMutation(UPDATE_CHAT, {
    onCompleted: () => {
      // 나의채팅방, 1:1채팅방 페이지를 첫 페이지로 변경
      setCurrentPage(CHAT_DEFAULT_PAGE);
      refetch({ page: CHAT_DEFAULT_PAGE });
    },
  });

  const [createChatLog] = useMutation(CREATE_CHAT_LOG);

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      refetch();
    },
  });

  //채팅방 떠나기
  const leaveChat = async (uuid: string, ownerID: string, userID: string[]) => {
    if (ownerID === loginID) {
      await createChatLog({
        variables: {
          user: {
            userID: currentLoginIDVar(),
            chatUUID: uuid,
            message: 'destroy',
            type: 'notification',
          },
        },
      });
      await updateChat({
        variables: {
          newChat: {
            uuid: uuid,
            isAlive: false,
          },
        },
      });
    } else {
      await updateChat({
        variables: {
          newChat: {
            uuid: uuid,
            userID: userID.filter((user) => user !== loginID),
          },
        },
      });
      await createChatLog({
        variables: {
          user: {
            userID: currentLoginIDVar(),
            chatUUID: uuid,
            message: 'exit',
            type: 'notification',
          },
        },
      });
    }
    if (uuid === currentChatVar()) {
      currentChatVar(EMPTY_CHAT_UUID);
    }
  };

  //채팅방 생성
  const createChatFunc = ({ name, type, password }: { name: string; type: 'public' | 'private'; password: string }) => {
    let newChat = {};
    if (type === 'public') {
      newChat = { name: name, type: type, ownerID: loginID, userID: [loginID] };
    } else {
      //private
      newChat = { name: name, type: type, password: password, ownerID: loginID, userID: [loginID] };
    }
    createChat({
      variables: {
        newChat: newChat,
      },
    });
  };

  //userID가 prop으로 들어오면(나의채팅방, 1:1채팅방) 버튼 생성
  const createChatButton = !userID ? <CreateChatBox createChat={createChatFunc} /> : null;

  // effects
  // query를 통해 데이터를 받아오면 전체 페이지 개수 설정.
  useEffect(() => {
    if (loading || error) return;
    if (data !== undefined) {
      setChatsTotal(data.getChatCount);
    }
  }, [data, loading, error]);

  // 채팅방 떠나기(mutation)이 동작하여 캐시 데이터가 변경되면 하단 ChatPanel의 페이지의 채팅방 개수가 0이 되는 경우가 있음. 이때 첫 페이지로 돌려보내는 기능
  useEffect(() => {
    if (loading || error) return;
    if (data !== undefined && data.aliveChats.length === 0) {
      setCurrentPage(CHAT_DEFAULT_PAGE);
      refetch({ page: CHAT_DEFAULT_PAGE });
    }
  }, [data, setCurrentPage, refetch, loading, error]);

  // handlers
  // 페이지 전환시
  const handlePageChange = (nextPage: number) => {
    refetch({
      page: nextPage,
    });
    setCurrentPage(nextPage);
  };

  //탭 전환시
  const handleTabHandler = (e: ChangeEvent) => {
    const tabName = e.target.name;
    for (const item of chatListTabs) {
      if (item.name === tabName) {
        refetch({ page: CHAT_DEFAULT_PAGE, type: item.type });
        setCurrentPage(CHAT_DEFAULT_PAGE);
        return;
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  return (
    <Tabs h="440px">
      <Grid h="100%" w="100%" templateRows="repeat(3, max-content)">
        <GridItem rowSpan={1}>
          <ChatTabList chatListTabs={chatListTabs} handleTabHandler={handleTabHandler} />
        </GridItem>
        <GridItem rowSpan={1} minH="207px">
          <ChatTable
            chatList={data.aliveChats}
            chatListColumns={chatListColumns}
            chatListType={chatListType}
            startRowNum={(currentPage - 1) * CHAT_PAGE_SIZE}
            leaveChat={leaveChat}
            refetchChat={refetch}
          />
        </GridItem>
        <GridItem rowSpan={1}>
          <Grid templateColumns="3fr 2fr 2fr 1fr">
            <GridItem colStart={2}>
              <Paginator
                isDisabled={isDisabled}
                activeStyles={activeStyles}
                innerLimit={CHAT_PAGE_INNER_LIMIT}
                currentPage={currentPage}
                outerLimit={CHAT_PAGE_OUTER_LIMIT}
                normalStyles={normalStyles}
                separatorStyles={separatorStyles}
                pagesQuantity={pagesQuantity}
                onPageChange={handlePageChange}
              >
                <PageGroup isInline align="center" />
              </Paginator>
            </GridItem>
            <GridItem colStart={4}>{createChatButton}</GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Tabs>
  );
};
