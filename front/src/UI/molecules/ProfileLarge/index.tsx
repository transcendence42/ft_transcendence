import React from 'react';
import { Avatar } from '@chakra-ui/react';

interface ProfileLargeProps {
  name?: string;
  imageSrc?: string;
  ranking?: string;
  ladderScore?: string;
  winningPercentage?: number;
  totalWin?: number;
  totalLose?: number;
}

const ProfileLarge = ({
  name,
  imageSrc = '',
  ranking,
  ladderScore,
  winningPercentage,
  totalWin = 0,
  totalLose = 0,
}: ProfileLargeProps) => {
  return (
    <>
      <Avatar size="xl" margin="1rem" name={name} src={imageSrc} />
      <div>
        <table>
          <thead>
            <tr>
              <strong>{name}</strong>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                랭킹 <strong>{ranking}위</strong>
              </td>
              <td>
                래더 점수 <strong>{ladderScore}점</strong>
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
    </>
  );
};

export default ProfileLarge;
