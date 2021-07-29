import React, { useRef, useState } from 'react';
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
  const [nick, setNick] = useState(nickname);
  const nicknameInput = useRef(null);
  const editNickname = (e) => {
    nicknameInput.current.disabled = false;
    nicknameInput.current.value = '';
    nicknameInput.current.focus();
  };

  const updateNicknameInput = (e) => {
    setNick(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('hahahah');
    }
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
                <td className="nickname">
                  <input
                    type="text"
                    className="nickname-input"
                    ref={nicknameInput}
                    value={nick}
                    placeholder="닉네임을 입력하세요."
                    onChange={updateNicknameInput}
                    onKeyPress={onKeyPress}
                  />
                </td>
                <td>
                  <button onClick={editNickname}>
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
