import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner, Box } from '@chakra-ui/react';
import MainButtons from '../../molecules/MainButtons';
import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';
import { GET_MY_PROFILE } from './MainPageHeaderQueries';
import { winRate } from '../../../utils/util';
import { ProfileLarge } from '../../molecules/ProfileLarge';
import { useHistory } from 'react-router-dom';

const MainPageHeader = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    pollInterval: 1000,
  });
  const history = useHistory();

  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }

  if (error) {
    return <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />;
  }

  if (!data || !data?.me) {
    history.push('/profile');
    return null;
  }

  return (
    <>
      <Box width="50%">
        <ProfileLarge
          userID={data.me.userID}
          nickname={data.me.nickname}
          avatar={data.me.avatar}
          ranking={data.me.ranking}
          ladderRating={data.me.ladderRating}
          totalWin={data.me.totalWin}
          totalLose={data.me.totalLose}
          winningPercentage={winRate(data.me.totalWin, data.me.totalLose)}
          reverse={false}
        />
      </Box>
      <Box width="50%">
        <MainButtons userID={data.me.userID} isMatched={data.me.isMatched} />
      </Box>
    </>
  );
};

export default MainPageHeader;
