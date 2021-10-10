import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_CURRENT_USERID } from './ProfileQuery';
import MiddleSectionTemplate from '../../templates/MiddleSection';
import { ProfileGameRecords } from '../../UI/molecules/ProfileGameRecords';
import ProfilePageHeader from '../../UI/organisms/ProfilePageHeader';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = (props) => {
  const history = useHistory();
  const { data, error, loading } = useQuery(GET_CURRENT_USERID, {
    pollInterval: 200,
  });
  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log('error');
  }

  if (data?.me.isMatched === 'matched') {
    history.push({
      pathname: '/game',
      state: {
        userID: data.me.userID,
      },
    });
  }

  const userID = props.match.params.userID ? props.match.params.userID : data?.me.userID;
  return (
    <MiddleSectionTemplate middleSectionHeader={<ProfilePageHeader userID={props.match.params.userID} />}>
      <ProfileGameRecords userID={userID} />
    </MiddleSectionTemplate>
  );
};

export default Profile;
