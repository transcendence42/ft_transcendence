import { useQuery } from '@apollo/client';
import React from 'react';
import { TwoFactorAuthInput } from '../../molecules/TwoFactorAuthInput';
import { TwoFactorAuthQRBox } from '../TwoFactorAuthQRBox';
import { GET_MY_OPT_CONFIG } from './TwoFactorAuthBoxQueries';
import './index.scss';

export const TwoFactorAuthBox = () => {
  const { data, error, loading } = useQuery(GET_MY_OPT_CONFIG);
  if (error) {
    return <>Error</>;
  }
  if (loading) {
    return <>Loading</>;
  }
  if (data.me.twoFactorAuthSecret) {
    return (
      <>
        <div className="two_factor_auth_container">
          <TwoFactorAuthInput />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="two_factor_auth_container">
        <TwoFactorAuthQRBox />
      </div>
    </>
  );
};
