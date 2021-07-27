import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import ProfileLarge from '../../UI/molecules/ProfileLarge';
import { ProfileGameRecordTable } from '../../UI/organisms/ProfileGameRecordTable';

const Profile: React.FC = () => {
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfileLarge />}>
      <ProfileGameRecordTable />
    </MiddleSectionTemplate>
  );
};

export default Profile;
