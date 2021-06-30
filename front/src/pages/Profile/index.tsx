import React, { useState } from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import ProfileLarge from '../../UI/molecules/ProfileLarge';
// import { ProfileSmall } from '../../UI/molecules';
import { Table, Thead, Tbody, Tr, Td, Th, Box } from '@chakra-ui/react';

const TableHeader = () => {
  const headerMeta = ['#', '점수', '게임시간', '게임일시', '상대방프로필'];

  return (
    <>
      <Thead>
        <Tr>
          {headerMeta.map((title, index) => (
            <Th key={index}>{title}</Th>
          ))}
        </Tr>
      </Thead>
    </>
  );
};

const TableRow = ({ key, data }) => {
  const [RowData] = useState(data);

  return (
    <>
      <Tr key={key}>
        <Td>{RowData.index}</Td>
        <Td>{RowData.score}</Td>
        <Td>{RowData.playTime}</Td>
        <Td>{RowData.createdAt}</Td>
        <Td>{RowData.adversary}</Td>
      </Tr>
    </>
  );
};

const testData = () => {
  return {
    index: '1',
    score: '3:2',
    playTime: '4분 42초',
    createdAt: '2021-06-21 15:35',
    adversary: 'jwon',
  };
};

const ProfileTable = (props) => {
  const [tableData] = useState([testData()]);

  return (
    <>
      <Box bg="white">
        {tableData.length !== 0 && (
          <Table>
            <TableHeader />
            <Tbody>
              {tableData.map((data, index) => {
                return <TableRow key={index} data={data} />;
              })}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

const Profile: React.FC = () => {
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfileLarge />}>
      <ProfileTable />
    </MiddleSectionTemplate>
  );
};

export default Profile;
