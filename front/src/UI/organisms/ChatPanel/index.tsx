import React, { useState, useEffect, ChangeEvent } from 'react';
import { GridItem, Grid, ButtonProps, Tabs, Spinner } from '@chakra-ui/react';
import { ChatTable } from '../ChatTable';
import { Paginator, PageGroup, usePaginator } from 'chakra-paginator';
import { CreateChat } from '../CreateChat';
import {
  CHAT_PAGE_OUTER_LIMIT,
  CHAT_PAGE_INNER_LIMIT,
  CHAT_PAGE_SIZE,
  CHAT_DEFAULT_PAGE,
} from '../../../utils/constants';
import { ChatTabList } from '../../../UI/organisms/ChatTabList';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_CHAT, GET_CHATS, UPDATE_CHAT } from './ChatPanelQueries';

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
  const { chatListColumns, chatListType, chatListTabs, userID /*metadatas, setmetadata*/ } = props;

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
  const [updateChatToDead] = useMutation(UPDATE_CHAT, {
    onCompleted: () => {
      // 나의채팅방, 1:1채팅방 페이지를 첫 페이지로 변경
      setCurrentPage(CHAT_DEFAULT_PAGE);
      refetch({ page: CHAT_DEFAULT_PAGE });
    },
  });

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      refetch();
    },
  });

  //채팅방 떠나기
  const leaveChat = (uuid: string, ownerID: string, userID: string[]) => {
    let leftChat = {}; // 나간 채팅방 정보가 담김.
    if (ownerID === 'yshin') {
      // TODO: yshin을 session 값으로 바꿔야 함.
      leftChat = {
        uuid: uuid,
        isAlive: false,
      };
    } else {
      leftChat = {
        uuid: uuid,
        userID: userID.filter((user) => user !== 'yshin'), //TODO: 'yshin'을 session 값으로 바꿔야 함.
      };
    }
    updateChatToDead({
      variables: {
        newChat: leftChat,
      },
    });
  };

  //채팅방 생성
  const createChatFunc = ({ name, type, password }: { name: string; type: 'public' | 'private'; password: string }) => {
    let newChat = {};
    if (type === 'public') {
      newChat = { name: name, type: type, ownerID: 'yshin' }; //TODO: 'yshin' session 값으로 바꿔야 함.
    } else {
      //private
      newChat = { name: name, type: type, password: password, ownerID: 'yshin' }; //TODO: 'yshin' session 값으로 바꿔야 함.
    }
    createChat({
      variables: {
        newChat: newChat,
      },
    });
  };

  //userID가 prop으로 들어오면(나의채팅방, 1:1채팅방) 버튼 생성
  const createChatButton = !userID ? <CreateChat createChat={createChatFunc} /> : <></>;

  // effects
  // query를 통해 데이터를 받아오면 전체 페이지 개수 설정.
  useEffect(() => {
    if (data !== undefined) {
      setChatsTotal(data.getChatCount);
    }
  }, [data]);

  // 채팅방 떠나기(mutation)이 동작하여 캐시 데이터가 변경되면 하단 ChatPanel의 페이지의 채팅방 개수가 0이 되는 경우가 있음. 이때 첫 페이지로 돌려보내는 기능
  useEffect(() => {
    if (data !== undefined && data.aliveChats.length === 0) {
      setCurrentPage(CHAT_DEFAULT_PAGE);
      refetch({ page: CHAT_DEFAULT_PAGE });
    }
  }, [data, setCurrentPage, refetch]);

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
