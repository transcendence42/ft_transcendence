import { useQuery } from '@apollo/client';
import React from 'react';
import { toDataURL } from 'qrcode';
import { GET_OTP_AUTH_URL } from './TwoFactorAuthBoxQueries';

export const TwoFactorAuthQR = () => {
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
      <img alt="opt auth url" src={src} />
    </>
  );
};
