import React, { useState } from 'react';

export const TwoFactorAuthInput = () => {
  const [code, setCode] = useState();

  const updateCode = (e) => {
    setCode(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      nicknameInput.current.disabled = true;
    }
  };

  return <input type="number" onChange={updateCode} value={code} onKeyPress={onKeyPress} />;
};
