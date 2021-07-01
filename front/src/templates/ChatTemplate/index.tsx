import React, { useState } from 'react';
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
  const myChatListTabs = ['나의채팅방', '1:1 채팅방'];
  const myChatListcolumns = ['#', '제목', '인원', '방장', ''];
  const totalChatListcolumns = ['#', '제목', '인원', '방장'];
  const totalChatListTabs = ['전체채팅방', '공개채팅방', '비공개채팅방'];
  const exitChat = (uuid: string) => {
    setMyList(myList.filter((item) => item.uuid !== uuid));
    setTotalList(totalList.filter((item) => item.uuid !== uuid));
  };
  const [myList, setMyList] = useState(myChatList);
  const [totalList, setTotalList] = useState(totalChatList);
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
                    chatList={myList}
                    columns={myChatListcolumns}
                    chatListType="myList"
                    startRowNum={0}
                    endRowNum={3}
                    exitChat={exitChat}
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
                    chatList={myList.filter((item) => item.type === 'dm')}
                    columns={myChatListcolumns}
                    chatListType="dmList"
                    startRowNum={0}
                    endRowNum={3}
                    exitChat={exitChat}
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
                    chatList={totalList}
                    columns={totalChatListcolumns}
                    chatListType="totalList"
                    startRowNum={0}
                    endRowNum={3}
                    exitChat={exitChat}
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
                    chatList={totalList.filter((item) => item.type === 'public')}
                    columns={totalChatListcolumns}
                    chatListType="publicList"
                    startRowNum={0}
                    endRowNum={3}
                    exitChat={exitChat}
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
                    chatList={totalList.filter((item) => item.type === 'private')}
                    columns={totalChatListcolumns}
                    chatListType="privateList"
                    startRowNum={0}
                    endRowNum={3}
                    exitChat={exitChat}
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
