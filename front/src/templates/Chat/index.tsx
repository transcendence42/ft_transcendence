import React from 'react';
import { Grid, GridItem, Tabs, Table, Thead, Tr, Th, Tbody, Td, Box, TabPanels, TabPanel } from '@chakra-ui/react';
import { ChatTabList } from '../../UI/organisms/ChatTabList';

interface IChat {
  title: string;
  type: 'public' | 'private' | 'dm';
  numOfPeople: number;
  onwer: string;
}

const ChatTemplate = ({ myChatList, totalChatList }: { myChatList: IChat[]; totalChatList: IChat[] }) => {
  // const dmList = myChatList.filter((item) => item.type === 'dm');
  // const publicList = totalChatList.filter((item) => item.type === 'public');
  // const privateList = totalChatList.filter((item) => item.type === 'private');
  const myChatListTabs = ['나의채팅방', '1:1 채팅방'];
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
                  <Table
                    variant="unstyled"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '0 5px',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Thead>
                      <Tr style={{ backgroundColor: '#EDF2F7' }}>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '95px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            #
                          </Box>
                        </Th>

                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '600px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            제목
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '85px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            인원
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            방장
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '40px',
                          }}
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            저녁 내기 하실분?? 아무나 들어오세요.
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            저녁 내기 하실분?? 아무나 들어오세요.
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            저녁 내기 하실분?? 아무나 들어오세요.
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
                  <Table
                    variant="unstyled"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '0 5px',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Thead>
                      <Tr style={{ backgroundColor: '#EDF2F7' }}>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '95px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            #
                          </Box>
                        </Th>

                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '600px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            제목
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '85px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            인원
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            방장
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '40px',
                          }}
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1:1 채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1:1 채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1:1 채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            jwon
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          X
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
                  <Table
                    variant="unstyled"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '0 5px',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Thead>
                      <Tr style={{ backgroundColor: '#EDF2F7' }}>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            #
                          </Box>
                        </Th>

                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '600px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            제목
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            인원
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '120px',
                          }}
                        >
                          방장
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            전체채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            전체채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            전체채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
                  <Table
                    variant="unstyled"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '0 5px',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Thead>
                      <Tr style={{ backgroundColor: '#EDF2F7' }}>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            #
                          </Box>
                        </Th>

                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '600px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            제목
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            인원
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '120px',
                          }}
                        >
                          방장
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
                  <Table
                    variant="unstyled"
                    style={{
                      borderCollapse: 'separate',
                      borderSpacing: '0 5px',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Thead>
                      <Tr style={{ backgroundColor: '#EDF2F7' }}>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            #
                          </Box>
                        </Th>

                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '600px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            제목
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '100px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            인원
                          </Box>
                        </Th>
                        <Th
                          style={{
                            borderTop: '2px solid #4299E1',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '13px 2px',
                            width: '120px',
                          }}
                        >
                          방장
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            비공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            비공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                      <Tr style={{ backgroundColor: '#F7FAFC' }}>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            1
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            비공개채팅방
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          <Box
                            style={{
                              borderRight: '2px solid #DADADA',
                            }}
                          >
                            2
                          </Box>
                        </Td>
                        <Td
                          style={{
                            textAlign: 'center',
                            padding: '13px 2px',
                          }}
                        >
                          jwon
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
