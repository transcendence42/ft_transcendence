import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { ChatPanel } from '../../UI/organisms/ChatPanel';
import {
  CHAT_MY_LIST_COLUMNS,
  CHAT_TOTAL_LIST_COLUMNS,
  CHAT_TOP_PANEL_TABS,
  CHAT_BOTTOM_PANEL_TABS,
  CHAT_LIST_TYPE_MY_LIST,
  CHAT_LIST_TYPE_TOTAL_LIST,
} from '../../utils/constants';

const ChatTemplate = () => {
  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="repeat(2, 1fr)">
      <GridItem rowSpan={1}>
        <ChatPanel
          userID={'yshin'} //TODO: 'yshin' session 값으로 변경
          chatListTabs={CHAT_TOP_PANEL_TABS}
          chatListColumns={CHAT_MY_LIST_COLUMNS}
          chatListType={CHAT_LIST_TYPE_MY_LIST}
        />
      </GridItem>
      <GridItem rowSpan={1}>
        <ChatPanel
          chatListTabs={CHAT_BOTTOM_PANEL_TABS}
          chatListColumns={CHAT_TOTAL_LIST_COLUMNS}
          chatListType={CHAT_LIST_TYPE_TOTAL_LIST}
        />
      </GridItem>
    </Grid>
  );
};

export default ChatTemplate;
