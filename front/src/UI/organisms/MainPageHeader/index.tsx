import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner, Box } from '@chakra-ui/react';
import MainButtons from '../../molecules/MainButtons';
import ProfileLarge from '../../molecules/ProfileLarge';
import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';
import { GET_MAIN_PAGE_PROFILE } from './MainPageHeaderQuery';
import { winRate } from '../../../utils/util';

const MainPageHeader = () => {
  const { loading, error, data } = useQuery(GET_MAIN_PAGE_PROFILE);
  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }

  if (error) {
    return <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />;
  }

  return (
    <>
      <Box width="50%">
        <ProfileLarge
          name={data.me.userID}
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
        <MainButtons />
      </Box>
    </>
  );
};

export default MainPageHeader;
