import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const ChatTemplate = () => {
  return (
    <>
      <Grid minH="100vh" width="920px" margin="20px" templateRows="1fr 1fr">
        <GridItem rowSpan={1} bg="papayawhip">
          <Grid h="100%" w="100%" templateRows="max-content max-content max-content">
            <GridItem rowSpan={1} bg="lightblue">
              <Grid templateColumns="max-content max-content">
                <GridItem colSpan={1} bg="lightgreen">
                  tab1
                </GridItem>
                <GridItem colSpan={1} bg="aqua">
                  tab2
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem rowSpan={1} bg="skyblue">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>인원</th>
                    <th>방장</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                    <td>X</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                    <td>X</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                    <td>X</td>
                  </tr>
                </tbody>
              </table>
            </GridItem>
            <GridItem rowSpan={1} bg="lightyellow">
              <Grid templateColumns="3fr 2fr 2fr 1fr">
                <GridItem colStart={2} bg="burlywood">
                  <div>
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
          </Grid>
        </GridItem>
        <GridItem rowSpan={1} bg="tomato">
          <Grid h="100%" w="100%" templateRows="max-content max-content max-content">
            <GridItem rowSpan={1} bg="lightblue">
              <Grid templateColumns="max-content max-content max-content">
                <GridItem colSpan={1} bg="lightgreen">
                  tab1
                </GridItem>
                <GridItem colSpan={1} bg="aqua">
                  tab2
                </GridItem>
                <GridItem colSpan={1} bg="aquamarine">
                  tab3
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem rowSpan={1} bg="skyblue">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>인원</th>
                    <th>방장</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>저녁 내기 하실분?? 아무나 들어오세요.</td>
                    <td>2</td>
                    <td>jwon</td>
                  </tr>
                </tbody>
              </table>
            </GridItem>
            <GridItem rowSpan={1} bg="lightyellow">
              <Grid templateColumns="3fr 2fr 2fr 1fr">
                <GridItem colStart={2} bg="burlywood">
                  <div>
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
                <GridItem colStart={4} bg="cyan">
                  <button>채팅방 생성</button>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default ChatTemplate;
