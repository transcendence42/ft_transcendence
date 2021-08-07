import { useQuery } from '@apollo/client';
import React from 'react';
import { TwoFactorAuthInput } from '../../atoms/TwoFactorAuthInput';
import { TwoFactorAuthQR } from '../../atoms/TwoFactorAuthQR';
import { GET_MY_OPT_CONFIG } from './TwoFactorAuthBoxQueries';

export const TwoFactorAuthBox = () => {
  const { data, error, loading } = useQuery(GET_MY_OPT_CONFIG);
  if (error) {
    return <>Error</>;
  }
  if (loading) {
    return <>Loading</>;
  }
  if (data.me.twoFactorAuthSecret) {
    return <TwoFactorAuthInput />;
  }
  return <TwoFactorAuthQR />;
};
