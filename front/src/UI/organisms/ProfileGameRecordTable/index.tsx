import React from 'react';
import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/table';
// // import './index.scss';
// import { GET_GAME_RECORD } from './ProfileGameRecordTableQueries';
// import { useQuery } from '@apollo/client';

export const ProfileGameRecordTable = ({ ...props }) => {
  const gameRecordTableHeader = ['#', '점수', '게임시간', '게임일시', '상대방프로필'];
  // const { loading, error, data } = useQuery(GET_GAME_RECORD, {
  //   // https://www.apollographql.com/docs/react/data/queries/
  //   // variables: {},
  //   // nextFetchPolicy: 'no-cache', //
  //   // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
  // });
  const {} = props;
  return (
    <Table>
      <Thead>
        <Tr>
          {gameRecordTableHeader.map((title, index) => (
            <Th key={index}>{title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
};
