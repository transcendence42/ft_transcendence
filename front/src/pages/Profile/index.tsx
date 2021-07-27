import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import { ProfileGameRecordTable } from '../../UI/organisms/ProfileGameRecordTable';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';

const Profile: React.FC = () => {
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfilePageHeader />}>
      <ProfileGameRecordTable />
    </MiddleSectionTemplate>
  );
};

export default Profile;
