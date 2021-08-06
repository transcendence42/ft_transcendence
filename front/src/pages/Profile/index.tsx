import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_CURRENT_USERID } from '../../templates/ChatTemplate/ChatTemplateQueries';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import { ProfileGameRecords } from '../../UI/molecules/ProfileGameRecords';
// import { GET_MY_USERINFO } from '../../UI/molecules/ProfileGameRecords/ProfileGameRecordsQuries';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';

const Profile: React.FC = (props) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USERID);
  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log('error');
  }
  console.log('USER DATA ', data);
  const userID = props.match.params.userID ? props.match.params.userID : data?.me.userID;
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfilePageHeader userID={props.match.params.userID} />}>
      <ProfileGameRecords userID={userID} />
    </MiddleSectionTemplate>
  );
};

export default Profile;
