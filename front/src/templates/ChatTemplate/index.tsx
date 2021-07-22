import React from 'react';
import { useQuery } from '@apollo/client';
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
import { GET_CURRENT_USERID } from './ChatTemplateQueries';
import { currentLoginIDVar } from '../../apollo/apolloProvider';

const ChatTemplate = () => {
  // 로그인 ID 가져오기
  const { data, loading, error } = useQuery(GET_CURRENT_USERID);
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>ERROR</>;
  }
  currentLoginIDVar(data.me.userID);
  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="repeat(2, 1fr)">
      <GridItem rowSpan={1}>
        <ChatPanel
          userID={currentLoginIDVar()}
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
