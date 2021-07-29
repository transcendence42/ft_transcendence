import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Spinner, Box } from '@chakra-ui/react';
import { ProfileLarge } from '../../molecules/ProfileLarge';
import { SPINNER_COLOR } from '../../../utils/constants';
import { winRate } from '../../../utils/util';
import { GET_OTHERS_PROFILE } from './ProfilePageHeaderQueries';
import { GET_MY_PROFILE } from '../MainPageHeader/MainPageHeaderQueries';
import { Redirect } from 'react-router-dom';
import { ProfileLargeEdit } from '../../molecules/ProfileLargeEdit';
import { FileUploadButton } from '../../atoms/FileUploadButton';

const ProfilePageHeader = ({ ...props }) => {
  const { userID } = props;
  const { loading, error, data } = useQuery(userID ? GET_OTHERS_PROFILE(userID) : GET_MY_PROFILE);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }

  if (error) {
    return <Redirect to="/404" />;
  }

  return userID ? (
    <>
      <Box width="50%">
        <ProfileLarge
          userID={data.user.userID}
          nickname={data.user.nickname}
          avatar={data.user.avatar}
          ranking={data.user.ranking}
          ladderRating={data.user.ladderRating}
          totalWin={data.user.totalWin}
          totalLose={data.user.totalLose}
          winningPercentage={winRate(data.user.totalWin, data.user.totalLose)}
          reverse={false}
        />
      </Box>
    </>
  ) : (
    <>
      <Box width="50%">
        <ProfileLargeEdit
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
      <FileUploadButton />
    </>
  );
};

export default ProfilePageHeader;
