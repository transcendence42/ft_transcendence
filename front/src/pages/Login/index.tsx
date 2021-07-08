import React from 'react';
import { Button } from '@chakra-ui/react';

const login = () => {
  window.location.href = 'http://localhost:5500/auth/login';
};

const Login: React.FC = () => {
  return <Button onClick={login}>42 Login</Button>;
};

export default Login;
