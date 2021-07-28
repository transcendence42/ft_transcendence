import React from 'react';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';

const Profile: React.FC = (props) => {
  console.log(props.match.params.userID);
  return (
    <MiddleSectionTemplate
      middleSectionHeader={<ProfilePageHeader userID={props.match.params.userID} />}
    ></MiddleSectionTemplate>
  );
};

export default Profile;
