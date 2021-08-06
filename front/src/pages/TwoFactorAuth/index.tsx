import { Center } from '@chakra-ui/react';
import React from 'react';
import { TwoFactorAuthInput } from '../../UI/atoms/TwoFactorAuthInput';
import { TwoFactorAuthQR } from '../../UI/atoms/TwoFactorAuthQR';

export const TwoFactorAuth: React.FC = () => {
  return (
    <Center>
      <TwoFactorAuthQR />
      <TwoFactorAuthInput />
    </Center>
  );
};
