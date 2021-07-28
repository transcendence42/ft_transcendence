import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';

const Profile: React.FC = (props) => {
  return (
    <MiddleSectionTemplate
      middleSectionHeader={<ProfilePageHeader userID={props.match.params.userID} />}
    ></MiddleSectionTemplate>
  );
};

export default Profile;
