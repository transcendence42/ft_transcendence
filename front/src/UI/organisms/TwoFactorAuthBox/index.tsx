import { useQuery } from '@apollo/client';
import React from 'react';
import { TwoFactorAuthInput } from '../../atoms/TwoFactorAuthInput';
import { TwoFactorAuthQR } from '../../atoms/TwoFactorAuthQR';
import { GET_MY_OPT_SECRET } from './TwoFactorAuthBoxQueries';

export const TwoFactorAuthBox = () => {
  const { data, error, loading } = useQuery(GET_MY_OPT_SECRET);
  if (error) {
    return <>Error</>;
  }
  if (loading) {
    return <>Loading</>;
  }
  console.log('data', data);
  if (data.me.twoFactorAuthSecret) {
    return <TwoFactorAuthInput />;
  }
  return <TwoFactorAuthQR />;
};
