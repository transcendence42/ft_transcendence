import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { ParticleBackground } from '../../UI/atoms/ParticleBackground';

const login = () => {
  window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/login`;
};

const Login: React.FC = () => {
  return (
    <>
      <ParticleBackground />
      <Center height="100vh">
        <Button onClick={login}>42 Login</Button>
      </Center>
    </>
  );
};

export default Login;
