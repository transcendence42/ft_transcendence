import React, { useState } from 'react';
import { Grid, GridItem, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { ChatRoomTabList } from '../../UI/organisms/ChatRoomTabList';
import { ChatRoomPanel } from '../../UI/organisms/ChatRoomPanel';
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
  const leaveChatRoom = (uuid: string) => {
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
              <ChatRoomTabList tabs={myChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatRoomPanel
                  chatList={myList}
                  chatListColumns={myChatListColumns}
                  chatListType="myList"
                  leaveChatRoom={leaveChatRoom}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatRoomPanel
                  chatList={myList.filter((item: IChat) => item.type === 'dm')}
                  chatListColumns={myChatListColumns}
                  chatListType="dmList"
                  leaveChatRoom={leaveChatRoom}
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
              <ChatRoomTabList tabs={totalChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <ChatRoomPanel
                  chatList={totalList}
                  chatListColumns={totalChatListColumns}
                  chatListType="totalList"
                  leaveChatRoom={leaveChatRoom}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatRoomPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'public')}
                  chatListColumns={totalChatListColumns}
                  chatListType="publicList"
                  leaveChatRoom={leaveChatRoom}
                  createChat={createChat}
                />
              </TabPanel>
              <TabPanel p={0}>
                <ChatRoomPanel
                  chatList={totalList.filter((item: IChat) => item.type === 'private')}
                  chatListColumns={totalChatListColumns}
                  chatListType="privateList"
                  leaveChatRoom={leaveChatRoom}
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
