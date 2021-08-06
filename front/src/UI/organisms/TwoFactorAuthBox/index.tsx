import { useQuery } from '@apollo/client';
import { Center } from '@chakra-ui/layout';
import React from 'react';
import { GET_OTP_AUTH_URL } from './TwoFactorAuthBoxQueries';
import { toDataURL } from 'qrcode';

export const TwoFactorAuthBox = () => {
  const { data, error, loading } = useQuery(GET_OTP_AUTH_URL);

  if (error) {
    return <>Error</>;
  }
  if (loading) {
    return <>Loading</>;
  }
  const url = data.getOtpAuthUrl;
  let src = '';
  toDataURL(url, async (err, imageSrc) => {
    if (err) {
      console.log('error');
    }
    src = imageSrc;
    console.log(imageSrc);
  });

  return (
    <>
      <Center>
        <img alt="opt auth url" src={src} />
      </Center>
    </>
  );
};
