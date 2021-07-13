import React from 'react';
import { Button } from '@chakra-ui/react';

import { LOGIN_URL } from '../../utils/constants';

const login = () => {
  window.location.href = LOGIN_URL;
};

const Login: React.FC = () => {
  return <Button onClick={login}>42 Login</Button>;
};

export default Login;
