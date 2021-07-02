import React, { useState, useEffect } from 'react';
import { GridItem, Grid, ButtonProps } from '@chakra-ui/react';
import { ChatRoomTable } from '../ChatRoomTable';
import { Paginator, PageGroup, usePaginator } from 'chakra-paginator';
import { CreateChatRoomButton } from '../CreateChatRoomButton';

export const ChatRoomPanel = ({ ...props }) => {
  const { chatList, chatListColumns, chatListType, leaveChatRoom, createChat } = props;
  const createChatButton = createChat ? <CreateChatRoomButton createChat={createChat} /> : <></>;

  // react hooks
  const [chatsTotal, setChatsTotal] = useState<number | undefined>(chatList.length);

  // constants
  const outerLimit = 1;
  const innerLimit = 1;

  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: chatsTotal,
    initialState: {
      pageSize: 3,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // effects
  useEffect(() => {
    const totalChatCount = chatList.length;
    setChatsTotal(totalChatCount);
    //currentPage 값 변경. ex) 입장한 채팅방이 4개이고 2페이지를 참조하고 있을 때, 4개의 채팅방 중 하나를 나가게 되면 3개로 줄어들면서 currentPage는 1로 변경되어야 함. 아래 로직은 이를 위한 로직.
    if (totalChatCount % 3 !== 0) {
      return;
    }
    if (totalChatCount / 3 < currentPage) {
      setCurrentPage(totalChatCount / 3);
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
        <ChatRoomTable
          chatList={chatList}
          columns={chatListColumns}
          chatListType={chatListType}
          startRowNum={(currentPage - 1) * 3}
          endRowNum={currentPage * 3}
          leaveChatRoom={leaveChatRoom}
        />
      </GridItem>
      <GridItem rowSpan={1}>
        <Grid templateColumns="3fr 2fr 2fr 1fr">
          <GridItem colStart={2}>
            <Paginator
              isDisabled={isDisabled}
              activeStyles={activeStyles}
              innerLimit={innerLimit}
              currentPage={currentPage}
              outerLimit={outerLimit}
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
