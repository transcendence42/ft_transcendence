import React, { useState, useEffect } from 'react';
import { GridItem, Grid, ButtonProps } from '@chakra-ui/react';
import { ChatTable } from '../ChatTable';
import { Paginator, PageGroup, usePaginator } from 'chakra-paginator';
import { CreateChatButton } from '../CreateChatButton';
import { CHAT_PAGE_OUTER_LIMIT, CHAT_PAGE_INNER_LIMIT, CHAT_PAGE_SIZE } from '../../../utils/constants';

export const ChatPanel = ({ ...props }) => {
  const { chatList, chatListColumns, chatListType, leaveChat, createChat } = props;

  const createChatButton = createChat ? <CreateChatButton createChat={createChat} /> : <></>;

  // react hooks
  const [chatsTotal, setChatsTotal] = useState<number | undefined>(chatList.length);

  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: chatsTotal,
    initialState: {
      pageSize: CHAT_PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // effects
  useEffect(() => {
    const totalChatCount = chatList.length;
    setChatsTotal(totalChatCount);
    //currentPage 값 변경. ex) 입장한 채팅방이 4개이고 2페이지를 참조하고 있을 때, 4개의 채팅방 중 하나를 나가게 되면 3개로 줄어들면서 currentPage는 1로 변경되어야 함. 아래 로직은 이를 위한 로직.
    if (totalChatCount % CHAT_PAGE_SIZE !== 0) {
      return;
    }
    if (totalChatCount / CHAT_PAGE_SIZE < currentPage) {
      setCurrentPage(totalChatCount / CHAT_PAGE_SIZE);
    }
  }, [currentPage, setCurrentPage, chatList]);

  // styles
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

  // handlers
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  return (
    <>
      <GridItem rowSpan={1} minH="207px">
        <ChatTable
          chatList={chatList}
          chatListColumns={chatListColumns}
          chatListType={chatListType}
          startRowNum={(currentPage - 1) * CHAT_PAGE_SIZE}
          endRowNum={currentPage * CHAT_PAGE_SIZE}
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
    </>
  );
};
