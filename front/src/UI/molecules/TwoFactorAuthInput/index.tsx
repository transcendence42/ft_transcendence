import { useQuery } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { GET_MY_OPT_CONFIG } from '../../organisms/TwoFactorAuthBox/TwoFactorAuthBoxQueries';
import './index.scss';

export const TwoFactorAuthInput = () => {
  const [code, setCode] = useState();
  const { data, error, loading } = useQuery(GET_MY_OPT_CONFIG);
  const inputRef = useRef<HTMLInputElement>();
  if (error) {
    return <>Error</>;
  }
  if (loading) {
    return <>Loading</>;
  }

  const updateCode = (e) => {
    setCode(e.target.value);
  };

  const onKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await submitOptCode;
    }
  };

  const submitOptCode = async (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: code, secret: data.me.twoFactorAuthSecret }),
    };
    await fetch(`${process.env.REACT_APP_CLIENT_URL}/auth/otp`, requestOptions);
    window.location.reload();
  };

  return (
    <>
      <input
        className="opt_input"
        type="number"
        ref={inputRef}
        onChange={updateCode}
        value={code || ''}
        onKeyPress={onKeyPress}
        placeholder="OTP 값을 입력하세요."
      />
      <Button onClick={submitOptCode}>제출하기</Button>
    </>
  );
};
