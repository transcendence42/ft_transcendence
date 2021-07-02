import React, { useState } from 'react';
import { Grid, GridItem, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { ChatTabList } from '../../UI/organisms/ChatTabList';
import { ChatPanel } from '../../UI/organisms/ChatPanel';
import { v4 as uuidv4 } from 'uuid';

interface IChat {
  uuid: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  owner: string;
}

const ChatTemplate = ({ ...props }) => {
  const { myChatList, totalChatList } = props;
  const myChatListColumns = ['#', '제목', '인원', '방장', ''];
  const totalChatListColumns = ['#', '제목', '인원', '방장'];
  const myChatListTabs = ['나의채팅방', '1:1 채팅방'];
  const totalChatListTabs = ['전체채팅방', '공개채팅방', '비공개채팅방'];
  const [myList, setMyList] = useState(myChatList);
  const [totalList, setTotalList] = useState(totalChatList);
  const leaveChat = (uuid: string) => {
    setMyList(myList.filter((item: IChat) => item.uuid !== uuid));
    setTotalList(totalList.filter((item: IChat) => item.uuid !== uuid));
    //TODO: delete chat from db
  };
  const createChat = ({ name, type, password }: { name: string; type: 'public' | 'private'; password: string }) => {
    //TODO: insert chat into db and take return info
    const dummyChat: IChat = { uuid: uuidv4(), name: name, type: type, numOfPeople: 1, owner: 'session' };
    setMyList([...myList, dummyChat]);
    setTotalList([...totalList, dummyChat]);
  };
  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="repeat(2, 1fr)">
      <GridItem rowSpan={1}>
        <Tabs variant="unstyled">
          <Grid h="100%" w="100%" templateRows="repeat(3, max-content)">
            <GridItem rowSpan={1}>
              <ChatTabList tabs={myChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={myList}
                  chatListColumns={myChatListColumns}
                  chatListType="myList"
                  leaveChat={leaveChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={myList.filter((item: IChat) => item.type === 'dm')}
                  chatListColumns={myChatListColumns}
                  chatListType="dmList"
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
              <ChatTabList tabs={totalChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList}
                  chatListColumns={totalChatListColumns}
                  chatListType="totalList"
                  leaveChat={leaveChat}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'public')}
                  chatListColumns={totalChatListColumns}
                  chatListType="publicList"
                  leaveChat={leaveChat}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'private')}
                  chatListColumns={totalChatListColumns}
                  chatListType="privateList"
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
