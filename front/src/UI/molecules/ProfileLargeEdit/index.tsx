import React, { useRef } from 'react';
import { Box, Img } from '@chakra-ui/react';
import { IProfileLarge } from '../../../utils/interface';
import '../ProfileLarge/index.scss';

export const ProfileLargeEdit = ({
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
  const nicknameInput = useRef(null);
  const editNickname = (e) => {
    nicknameInput.current.innerHTML = 'yeji';
  };

  return (
    <>
      <Box className={reverse ? 'profile-large-reverse' : 'profile-large'}>
        <div className="avatar-container">
          <Img className="avatar" src={avatar} />
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>{nickname}</td>
                <td>
                  <button onClick={editNickname} onKeyDown={editNickname}>
                    <span role="img" aria-label="pencil">
                      ✏️
                    </span>
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  ID <strong>{userID}</strong>
                </td>
                <td>
                  래더 <strong>{ladderRating}점</strong>({ranking}위)
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
