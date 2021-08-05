import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAME_RECORDS } from './ProfileGameRecordsQuries';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useTable } from 'react-table';
import { convertTimestampToPlaytime, convertTimestampToDate } from '../../../utils/util';
export interface ITableData {
  playerOneID: string;
  playerOneScore: number;
  playerTwoID: string;
  playerTwoScore: number;
  createdAt: string;
  finishedAt: string;
}

interface IGameRecords {
  tableData: Array<ITableData>;
  userID: string | undefined;
}

const getGameResult = (userID: string | undefined, data: ITableData) => {
  if (data.playerOneID === userID) {
    return data.playerOneScore > data.playerTwoScore ? '승' : '패';
  }
  return data.playerOneScore > data.playerTwoScore ? '패' : '승';
};
const getGameScore = (userID: string | undefined, data: ITableData) => {
  if (data.playerOneID === userID) {
    return `${data.playerOneScore} : ${data.playerTwoScore}`;
  }
  return `${data.playerTwoScore} : ${data.playerOneScore}`;
};

const getOpponentUserID = (userID: string | undefined, data: ITableData) => {
  return data.playerOneID === userID ? data.playerTwoID : data.playerOneID;
};

const refineData = (userID: string | undefined, tableData: Array<ITableData>) => {
  return tableData.map((x) => {
    return {
      index: '1',
      result: getGameResult(userID, x),
      score: getGameScore(userID, x),
      playTime: convertTimestampToPlaytime(Date.parse(x.finishedAt) - Date.parse(x.createdAt)),
      createdAt: convertTimestampToDate(Date.parse(x.createdAt)),
      opponentUserID: getOpponentUserID(userID, x),
    };
  });
};

const DataTable = ({ tableData, userID }: IGameRecords) => {
  const data = refineData(userID, tableData);
  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index',
      },
      {
        Header: '경기 결과',
        accessor: 'result',
      },
      {
        Header: '점수',
        accessor: 'score',
      },
      {
        Header: '게임시간',
        accessor: 'playTime',
      },
      {
        Header: '일시',
        accessor: 'createdAt',
      },
      {
        Header: '상대방 ID',
        accessor: 'opponentUserID',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key="">
            {headerGroup.headers.map((column) => (
              <Th key="">{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key="">
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} key="">
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export const ProfileGameRecords = ({ ...props }) => {
  const { userID } = props;
  const { loading, error, data } = useQuery(GET_GAME_RECORDS(userID));
  if (loading) {
    return <>Loading</>;
  }
  if (error) {
    return <>Error</>;
  }
  return <DataTable tableData={data?.gameRecords} userID={userID} />;
};
