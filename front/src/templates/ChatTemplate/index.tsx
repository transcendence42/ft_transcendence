import React, { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { ChatPanel } from '../../UI/organisms/ChatPanel';
import {
  CHAT_MY_LIST_COLUMNS,
  CHAT_TOTAL_LIST_COLUMNS,
  CHAT_TOP_PANEL_TABS,
  CHAT_BOTTOM_PANEL_TABS,
  CHAT_LIST_TYPE_MY_LIST,
  CHAT_LIST_TYPE_TOTAL_LIST,
  CHAT_DEFAULT_PAGE,
  CHAT_DEFAULT_TYPE,
} from '../../utils/constants';

const ChatTemplate = () => {
  const [chatMetadatas, setChatMetadatas] = useState({
    user: { type: CHAT_DEFAULT_TYPE, page: CHAT_DEFAULT_PAGE }, //나의채팅방, 1:1채팅방
    total: { type: CHAT_DEFAULT_TYPE, page: CHAT_DEFAULT_PAGE }, //전체채팅방, 공개채팅방, 비공개채팅방
  });
  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="repeat(2, 1fr)">
      <GridItem rowSpan={1}>
        <ChatPanel
          userID={'yshin'} //TODO: 'yshin' session 값으로 변경
          metadatas={chatMetadatas}
          setMetadatas={setChatMetadatas}
          chatListTabs={CHAT_TOP_PANEL_TABS}
          chatListColumns={CHAT_MY_LIST_COLUMNS}
          chatListType={CHAT_LIST_TYPE_MY_LIST}
        />
      </GridItem>
      <GridItem rowSpan={1}>
        <ChatPanel
          metadatas={chatMetadatas}
          setMetadatas={setChatMetadatas}
          chatListTabs={CHAT_BOTTOM_PANEL_TABS}
          chatListColumns={CHAT_TOTAL_LIST_COLUMNS}
          chatListType={CHAT_LIST_TYPE_TOTAL_LIST}
        />
      </GridItem>
    </Grid>
  );
};

export default ChatTemplate;
