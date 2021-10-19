import { Center } from '@chakra-ui/react';
import React from 'react';
import { ParticleBackground } from '../../UI/atoms/ParticleBackground';
import { TwoFactorAuthBox } from '../../UI/organisms/TwoFactorAuthBox';

export const TwoFactorAuth: React.FC = () => {
  return (
    <>
      <ParticleBackground />
      <Center>
        <TwoFactorAuthBox />
      </Center>
    </>
  );
};
