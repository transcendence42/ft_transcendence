import React from 'react';
import { useQuery } from '@apollo/client';
import ProfileLarge from '../../molecules/ProfileLarge';
import { Spinner } from '@chakra-ui/react';
// import './index.scss';
import { GET_PROFILE_BY_ID } from './ProfilePageHeaderQueries';
import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';
import { winRate } from '../../../utils/util';

const ProfilePageHeader = () => {
  const { loading, error, data } = useQuery(GET_PROFILE_BY_ID, {
    variables: {
      userID: 'jwon',
    },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }
  if (error) {
    return <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />;
  }

  return (
    <>
      <ProfileLarge
        name={data.user.userID}
        avatar={data.user.avatar}
        ranking={data.user.ranking}
        ladderRating={data.user.ladderRating}
        totalWin={data.user.totalWin}
        totalLose={data.user.totalLose}
        winningPercentage={winRate(data.user.totalWin, data.user.totalLose)}
        reverse={false}
      />
    </>
  );
};

export default ProfilePageHeader;
