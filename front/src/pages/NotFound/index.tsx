import { Center } from '@chakra-ui/react';
import React from 'react';
import './index.scss';

export const NotFound = () => {
  return (
    <>
      <Center className="not-found">
        <h1>404</h1>
        <h2>Not Found</h2>
      </Center>
    </>
  );
};
