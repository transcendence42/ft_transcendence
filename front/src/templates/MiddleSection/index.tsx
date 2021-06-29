import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';

interface MiddleSectionTemplateProps {
  mainHeader?: ReactNode;
  children?: ReactNode;
}

const dummymainHeader = <div>mainHeader</div>;
const dummyContents = <div>contents</div>;

const MiddleSectionTemplate = ({
  mainHeader = dummymainHeader,
  children = dummyContents,
}: MiddleSectionTemplateProps) => {
  return (
    <Flex minH="100vh" width="920px" margin="20px" flexDirection="column">
      <Box minH="180px" padding="10px" backgroundColor="teal">
        {mainHeader}
      </Box>
      <Box marginTop="10px" padding="10px" backgroundColor="gray">
        {children}
      </Box>
    </Flex>
  );
};

export default MiddleSectionTemplate;
