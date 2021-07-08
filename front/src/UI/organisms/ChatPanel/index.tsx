import React, { useState, useEffect, ChangeEvent } from 'react';
import { GridItem, Grid, ButtonProps, Tabs } from '@chakra-ui/react';
import { ChatTable } from '../ChatTable';
import { Paginator, PageGroup, usePaginator } from 'chakra-paginator';
import { CreateChat } from '../CreateChat';
import { CHAT_PAGE_OUTER_LIMIT, CHAT_PAGE_INNER_LIMIT, CHAT_PAGE_SIZE } from '../../../utils/constants';
import { ChatTabList } from '../../../UI/organisms/ChatTabList';
import { useQuery, gql, useMutation } from '@apollo/client';

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
  const { chatListColumns, chatListType, chatListTabs, userID, metadatas, setMetadatas } = props;

  // react hooks
  const [chatsTotal, setChatsTotal] = useState<number | undefined>();

  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: chatsTotal,
    initialState: {
      pageSize: CHAT_PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const GET_CHATS = gql`
    query GetChats($userID: String, $type: String, $page: Int) {
      getChatCount(userID: $userID, type: $type)
      aliveChats(userID: $userID, type: $type, page: $page) {
        uuid
        name
        type
        ownerID
        userID
      }
    }
  `;
  const UPDATE_CHAT = gql`
    mutation UpdateChat($newChat: UpdateChatInput!) {
      updateChat(updateChatInput: $newChat) {
        uuid
        name
        type
        ownerID
        userID
      }
    }
  `;
  const CREATE_CHAT = gql`
    mutation CreateChat($newChat: CreateChatInput!) {
      createChat(createChatInput: $newChat) {
        uuid
        name
        type
        ownerID
        userID
      }
    }
  `;

  //fetch
  const { loading, error, data, refetch } = useQuery(GET_CHATS, {
    variables: { userID: userID, type: chatListTabs[0].type, page: 1 },
    nextFetchPolicy: 'cache-and-network',
  });

  const [updateChatToDead] = useMutation(UPDATE_CHAT, {
    onCompleted: () => {
      //페이지에 chat이 없으면 이전 페이지로 이동
      let curPageNum = currentPage;
      if (data.aliveChats.length === 1) {
        curPageNum = curPageNum === 1 ? curPageNum : curPageNum - 1;
      }
      refetch({ page: curPageNum });
      setCurrentPage(curPageNum);
      setMetadatas({ ...metadatas, user: { ...metadatas.user, page: curPageNum } });
    },
    refetchQueries: [
      userID
        ? {
            query: GET_CHATS,
            variables: {
              type: metadatas.total.type,
              page: metadatas.total.page,
            },
          }
        : {
            query: GET_CHATS,
            variables: {
              userID: userID,
              type: metadatas.user.type,
              page: metadatas.user.page,
            },
          },
    ],
  });

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      refetch();
    },
    refetchQueries: [
      userID
        ? {
            query: GET_CHATS,
            variables: {
              type: metadatas.total.type,
              page: metadatas.total.page,
            },
          }
        : {
            query: GET_CHATS,
            variables: {
              userID: userID,
              type: metadatas.user.type,
              page: metadatas.user.page,
            },
          },
    ],
  });

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

  const createChatFunc = ({ name, type, password }: { name: string; type: 'public' | 'private'; password: string }) => {
    let newChat = {};
    if (type === 'public') {
      newChat = { name: name, type: type, ownerID: 'yshin' }; //TODO: 'yshin' session 값으로 바꿔야 함.
    } else {
      newChat = { name: name, type: type, password: password, ownerID: 'yshin' };
    }
    createChat({
      variables: {
        newChat: newChat,
      },
    });
  };

  const createChatButton = !userID ? <CreateChat createChat={createChatFunc} /> : <></>;

  // effects
  useEffect(() => {
    if (data !== undefined) {
      setChatsTotal(data.getChatCount);
      if (data.getChatCount / CHAT_PAGE_SIZE < currentPage) {
        const curPage = Math.ceil(data.getChatCount / CHAT_PAGE_SIZE);
        setCurrentPage(curPage < 1 ? 1 : curPage);
        refetch({ page: curPage });
      }
    }
  }, [data, currentPage, refetch, setCurrentPage]);

  // handlers
  const handlePageChange = (nextPage: number) => {
    refetch({
      page: nextPage,
    });
    setCurrentPage(nextPage);
    if (userID) {
      setMetadatas({ ...metadatas, user: { ...metadatas.user, page: nextPage } });
    } else {
      setMetadatas({ ...metadatas, total: { ...metadatas.total, page: nextPage } });
    }
  };

  const handleTabHandler = (e: ChangeEvent) => {
    const tabName = e.target.name;
    for (const item of chatListTabs) {
      if (item.name === tabName) {
        refetch({ page: 1, type: item.type });
        setCurrentPage(1);
        if (userID) {
          setMetadatas({ ...metadatas, user: { ...metadatas.user, page: 1 } });
          setMetadatas({ ...metadatas, user: { ...metadatas.user, page: item.type } });
        } else {
          setMetadatas({ ...metadatas, total: { ...metadatas.total, page: 1 } });
          setMetadatas({ ...metadatas, total: { ...metadatas.total, page: item.type } });
        }
        return;
      }
    }
  };

  if (loading) return <></>;
  if (error) return <p>Error :(</p>;

  return (
    <Tabs>
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
