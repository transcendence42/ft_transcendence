import { Button } from '@chakra-ui/react';
import React from 'react';
import { TwoFactorAuthQR } from '../../molecules/TwoFactorAuthQR';

export const TwoFactorAuthQRBox = () => {
  const onClick = (e: Event) => {
    if (e) {
      window.location.reload();
    }
  };
  return (
    <>
      {/* <div>QR 코드로 OTP 계정을 발급 받으세요.</div> */}
      <TwoFactorAuthQR />
      <Button mt={2} onClick={onClick}>
        OTP 인증하기
      </Button>
    </>
  );
};
