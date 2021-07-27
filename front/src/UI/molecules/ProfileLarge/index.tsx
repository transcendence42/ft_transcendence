import React from 'react';
import { Avatar, Box } from '@chakra-ui/react';
import { IProfileLarge } from '../../../utils/interface';
import './index.scss';

const ProfileLarge = ({
  userID = 'ID',
  nickname = 'nickname',
  avatar = '',
  ranking = '?',
  ladderRating = '?',
  winningPercentage = 0,
  totalWin = 0,
  totalLose = 0,
  reverse = false,
}: IProfileLarge) => {
  return (
    <>
      <Box className={reverse ? 'profile-large-reverse' : 'profile-large'}>
        <Avatar size="xl" margin="1rem" userID={userID} src={avatar} />
        <div>
          <table>
            <thead>
              <tr>
                <td>
                  {nickname}({userID})
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  랭킹 <strong>{ranking}위</strong>
                </td>
                <td>
                  래더 점수 <strong>{ladderRating}점</strong>
                </td>
              </tr>
              <tr>
                <td>
                  승률 <strong>{winningPercentage}%</strong>
                </td>
                <td>
                  전적{' '}
                  <strong>
                    {totalWin + totalLose}전 {totalWin}승 {totalLose}패
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
};

export default ProfileLarge;
