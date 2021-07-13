import React from 'react';
import { Button } from '@chakra-ui/react';

const login = () => {
  window.location.href = 'http://127.0.0.1:5500/auth/login';
  // window.location.href = '/auth/login';
  // fetch('/auth/login', {
  //   mode: 'no-cors',
  //   redirect: 'follow',
  // }).then((res) => console.log(res.url));

  // fetch('http://localhost:5500/auth/login', {
  //   credentials: 'include',
  //   mode: 'no-cors',
  // }).then((response) => console.log(response));
};

const Login: React.FC = () => {
  return <Button onClick={login}>42 Login</Button>;
};

export default Login;
