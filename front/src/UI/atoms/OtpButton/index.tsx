import { useMutation } from '@apollo/client';
import { Switch } from '@chakra-ui/switch';
import React, { useState } from 'react';
import { IOptButton } from '../../../utils/interface';
import { TOGGLE_TWO_FACTOR_AUTH } from './OtpButtonQueries';
import './index.scss';

export const OptButton = ({ isEnabled }: IOptButton) => {
  const [toggleTwoFactorAuth] = useMutation(TOGGLE_TWO_FACTOR_AUTH);
  const [isChecked, setIsChecked] = useState(isEnabled);

  const onChange = async (e) => {
    const result = await toggleTwoFactorAuth().catch(() => {
      console.log('toggle two factor auth error');
      return;
    });
    setIsChecked(result.data.toggleTwoFactorAuthentication);
  };

  return (
    <>
      <div className="opt-button-container">
        <Switch size="md" isChecked={isChecked} onChange={onChange} />
      </div>
    </>
  );
};
