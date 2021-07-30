import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import { ProfileGameRecords } from '../../UI/molecules/ProfileGameRecords';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';

const Profile: React.FC = (props) => {
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfilePageHeader userID={props.match.params.userID} />}>
      <ProfileGameRecords userID={props.match.params.userID} />
    </MiddleSectionTemplate>
  );
};

export default Profile;
