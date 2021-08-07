import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CHECK_OPT_CODE } from './TwoFactorAuthInputQueries';

export const TwoFactorAuthInput = () => {
  const [code, setCode] = useState();
  const [checkOtpCode] = useMutation(CHECK_OPT_CODE);

  const updateCode = (e) => {
    setCode(e.target.value);
  };

  const onKeyPress = async (e) => {
    if (e.key === 'Enter') {
      console.log('e target value ', e.target.value);
      const result = await checkOtpCode({
        variables: {
          twoFactorAuthCode: e.target.value,
        },
      }).catch(() => {
        e.target.value = '';
        console.log('opt validation failed');
        return;
      });
      if (result === true) {
        console.log('otp validation success');
      }
    }
  };
  return <input type="number" onChange={updateCode} value={code} onKeyPress={onKeyPress} />;
};
