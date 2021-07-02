import React, { useState } from 'react';
import { Grid, GridItem, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { ChatTabList } from '../../UI/organisms/ChatTabList';
import { ChatPanel } from '../../UI/organisms/ChatPanel';
import { v4 as uuidv4 } from 'uuid';
import { IChat } from '../../utils/interface';
import {
  CHAT_MY_LIST_COLUMNS,
  CHAT_TOTAL_LIST_COLUMNS,
  CHAT_MY_LIST_TABS,
  CHAT_TOTAL_LIST_TABS,
  CHAT_LIST_TYPE_MY_LIST,
  CHAT_LIST_TYPE_DM_LIST,
  CHAT_LIST_TYPE_TOTAL_LIST,
  CHAT_LIST_TYPE_PUBLIC_LIST,
  CHAT_LIST_TYPE_PRIVATE_LIST,
} from '../../utils/constants';

const ChatTemplate = ({ ...props }) => {
  const { myChatList, totalChatList } = props;

  const [myList, setMyList] = useState(myChatList);
  const [totalList, setTotalList] = useState(totalChatList);

  const leaveChat = (uuid: string) => {
    setMyList(myList.filter((item: IChat) => item.uuid !== uuid));
    setTotalList(totalList.filter((item: IChat) => item.uuid !== uuid));
    //TODO: delete chat from db
  };

  const createChat = ({ name, type, password }: { name: string; type: 'public' | 'private'; password: string }) => {
    //TODO: insert chat into db and take return info
    const dummyChat: IChat = { uuid: uuidv4(), name: name, type: type, numOfPeople: 1, owner: 'session' }; //TODO: 더미 데이터이므로 삭제할 것.
    setMyList([...myList, dummyChat]);
    setTotalList([...totalList, dummyChat]);
  };

  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="repeat(2, 1fr)">
      <GridItem rowSpan={1}>
        <Tabs variant="unstyled">
          <Grid h="100%" w="100%" templateRows="repeat(3, max-content)">
            <GridItem rowSpan={1}>
              <ChatTabList tabs={CHAT_MY_LIST_TABS} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={myList}
                  chatListColumns={CHAT_MY_LIST_COLUMNS}
                  chatListType={CHAT_LIST_TYPE_MY_LIST}
                  leaveChat={leaveChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={myList.filter((item: IChat) => item.type === 'dm')}
                  chatListColumns={CHAT_MY_LIST_COLUMNS}
                  chatListType={CHAT_LIST_TYPE_DM_LIST}
                  leaveChat={leaveChat}
                />
              </TabPanel>
            </TabPanels>
          </Grid>
        </Tabs>
      </GridItem>
      <GridItem rowSpan={1}>
        <Tabs variant="unstyled">
          <Grid h="100%" w="100%" templateRows="repeat(3, max-content)">
            <GridItem rowSpan={1}>
              <ChatTabList tabs={CHAT_TOTAL_LIST_TABS} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList}
                  chatListColumns={CHAT_TOTAL_LIST_COLUMNS}
                  chatListType={CHAT_LIST_TYPE_TOTAL_LIST}
                  leaveChat={leaveChat}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'public')}
                  chatListColumns={CHAT_TOTAL_LIST_COLUMNS}
                  chatListType={CHAT_LIST_TYPE_PUBLIC_LIST}
                  leaveChat={leaveChat}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'private')}
                  chatListColumns={CHAT_TOTAL_LIST_COLUMNS}
                  chatListType={CHAT_LIST_TYPE_PRIVATE_LIST}
                  leaveChat={leaveChat}
                  createChat={createChat}
                />
              </TabPanel>
            </TabPanels>
          </Grid>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

export default ChatTemplate;
