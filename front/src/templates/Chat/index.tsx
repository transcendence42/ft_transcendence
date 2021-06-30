import React from 'react';
import { Grid, GridItem, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { ChatTabList } from '../../UI/organisms/ChatTabList';
import { ChatTable } from '../../UI/organisms/ChatTable';

interface IChat {
  uuid: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  owner: string;
}

const ChatTemplate = ({ myChatList, totalChatList }: { myChatList: IChat[]; totalChatList: IChat[] }) => {
  const publicChatList = totalChatList.filter((item) => item.type === 'public');
  const privateChatList = totalChatList.filter((item) => item.type === 'private');
  const myChatListTabs = ['나의채팅방', '1:1 채팅방'];
  const dmList = myChatList.filter((item) => item.type === 'dm');
  const myChatListcolumns = ['#', '제목', '인원', '방장', ''];
  const totalChatListcolumns = ['#', '제목', '인원', '방장'];
  const totalChatListTabs = ['전체채팅방', '공개채팅방', '비공개채팅방'];
  return (
    <Grid minH="100vh" width="920px" margin="20px" templateRows="1fr 1fr">
      <GridItem rowSpan={1}>
        <Tabs variant="unstyled">
          <Grid h="100%" w="100%" templateRows="max-content max-content max-content">
            <GridItem rowSpan={1}>
              <ChatTabList tabs={myChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <GridItem rowSpan={1}>
                  <ChatTable
                    chatList={myChatList}
                    columns={myChatListcolumns}
                    chatListType="myList"
                    startRowNum={0}
                    endRowNum={3}
                  />
                </GridItem>
                <GridItem rowSpan={1}>
                  <Grid templateColumns="3fr 2fr 2fr 1fr">
                    <GridItem colStart={2}>
                      <div style={{ textAlign: 'center' }}>
                        <span>&lt;</span>
                        <span>1</span>
                        <span>|</span>
                        <span>2</span>
                        <span>|</span>
                        <span>3</span>
                        <span>|</span>
                        <span>4</span>
                        <span>|</span>
                        <span>5</span>
                        <span>&gt;</span>
                      </div>
                    </GridItem>
                  </Grid>
                </GridItem>
              </TabPanel>
              <TabPanel p={0}>
                <GridItem rowSpan={1}>
                  <ChatTable
                    chatList={dmList}
                    columns={myChatListcolumns}
                    chatListType="dmList"
                    startRowNum={0}
                    endRowNum={3}
                  />
                </GridItem>
                <GridItem rowSpan={1}>
                  <Grid templateColumns="3fr 2fr 2fr 1fr">
                    <GridItem colStart={2}>
                      <div style={{ textAlign: 'center' }}>
                        <span>&lt;</span>
                        <span>1</span>
                        <span>|</span>
                        <span>2</span>
                        <span>|</span>
                        <span>3</span>
                        <span>|</span>
                        <span>4</span>
                        <span>|</span>
                        <span>5</span>
                        <span>&gt;</span>
                      </div>
                    </GridItem>
                  </Grid>
                </GridItem>
              </TabPanel>
            </TabPanels>
          </Grid>
        </Tabs>
      </GridItem>
      <GridItem rowSpan={1}>
        <Tabs variant="unstyled">
          <Grid h="100%" w="100%" templateRows="max-content max-content max-content">
            <GridItem rowSpan={1}>
              <ChatTabList tabs={totalChatListTabs} />
            </GridItem>
            <TabPanels>
              <TabPanel p={0}>
                <GridItem rowSpan={1}>
                  <ChatTable
                    chatList={totalChatList}
                    columns={totalChatListcolumns}
                    chatListType="totalList"
                    startRowNum={0}
                    endRowNum={3}
                  />
                </GridItem>
                <GridItem rowSpan={1}>
                  <Grid templateColumns="3fr 2fr 2fr 1fr">
                    <GridItem colStart={2}>
                      <div style={{ textAlign: 'center' }}>
                        <span>&lt;</span>
                        <span>1</span>
                        <span>|</span>
                        <span>2</span>
                        <span>|</span>
                        <span>3</span>
                        <span>|</span>
                        <span>4</span>
                        <span>|</span>
                        <span>5</span>
                        <span>&gt;</span>
                      </div>
                    </GridItem>
                  </Grid>
                </GridItem>
              </TabPanel>
              <TabPanel p={0}>
                <GridItem rowSpan={1}>
                  <ChatTable
                    chatList={publicChatList}
                    columns={totalChatListcolumns}
                    chatListType="publicList"
                    startRowNum={0}
                    endRowNum={3}
                  />
                </GridItem>
                <GridItem rowSpan={1}>
                  <Grid templateColumns="3fr 2fr 2fr 1fr">
                    <GridItem colStart={2}>
                      <div style={{ textAlign: 'center' }}>
                        <span>&lt;</span>
                        <span>1</span>
                        <span>|</span>
                        <span>2</span>
                        <span>|</span>
                        <span>3</span>
                        <span>|</span>
                        <span>4</span>
                        <span>|</span>
                        <span>5</span>
                        <span>&gt;</span>
                      </div>
                    </GridItem>
                  </Grid>
                </GridItem>
              </TabPanel>
              <TabPanel p={0}>
                <GridItem rowSpan={1}>
                  <ChatTable
                    chatList={privateChatList}
                    columns={totalChatListcolumns}
                    chatListType="privateList"
                    startRowNum={0}
                    endRowNum={3}
                  />
                </GridItem>
                <GridItem rowSpan={1}>
                  <Grid templateColumns="3fr 2fr 2fr 1fr">
                    <GridItem colStart={2}>
                      <div style={{ textAlign: 'center' }}>
                        <span>&lt;</span>
                        <span>1</span>
                        <span>|</span>
                        <span>2</span>
                        <span>|</span>
                        <span>3</span>
                        <span>|</span>
                        <span>4</span>
                        <span>|</span>
                        <span>5</span>
                        <span>&gt;</span>
                      </div>
                    </GridItem>
                  </Grid>
                </GridItem>
              </TabPanel>
            </TabPanels>
          </Grid>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

export default ChatTemplate;
