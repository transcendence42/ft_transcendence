import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import MiddleSectionHeader from '../../UI/organisms/MiddleSectionHeader';
import ProfileLarge from '../../UI/molecules/ProfileLarge';
import { Table, Thead, Tr, Td, Th, Tbody, Tfoot } from '@chakra-ui/react';

const Profile: React.FC = () => {
  return (
    <MiddleSectionTemplate middleSectionHeader={<MiddleSectionHeader rightComponent={<ProfileLarge />} />}>
      <Table variant="simple" size="lg" cellPadding="10px">
        <Thead>
          <Tr borderTop="3px" borderColor="blue.400">
            <Th>#</Th>
            <Th>점수</Th>
            <Th>게임시간</Th>
            <Th isNumeric>일시</Th>
            <Th isNumeric>상대방 프로필</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>승</Td>
            <Td>4분 42초</Td>
            <Td isNumeric>2021-06-21 15:35</Td>
            <Td isNumeric>profile small (right align)</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>패</Td>
            <Td>4분 42초</Td>
            <Td isNumeric>2021-06-21 15:35</Td>
            <Td isNumeric>profile small (right align)</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>승</Td>
            <Td>4분 42초</Td>
            <Td isNumeric>2021-06-21 15:35</Td>
            <Td isNumeric>profile small (right align)</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>#</Th>
            <Th>점수</Th>
            <Th>게임시간</Th>
            <Th isNumeric>일시</Th>
            <Th isNumeric>상대방 프로필</Th>
          </Tr>
        </Tfoot>
      </Table>
    </MiddleSectionTemplate>
  );
};

export default Profile;
