import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';

interface MiddleSectionTemplateProps {
  middleSectionHeader?: ReactNode;
  children?: ReactNode;
}

const dummyMiddleSectionHeader = <div>middle section header</div>;
const dummyContents = <div>contents</div>;

const MiddleSectionTemplate = ({
  middleSectionHeader = dummyMiddleSectionHeader,
  children = dummyContents,
}: MiddleSectionTemplateProps) => {
  return (
    <Flex minHeight="100vh" width="920px" margin="20px" flexDirection="column">
      <Box
        minHeight="180px"
        width="100%"
        padding="10px"
        backgroundColor="teal"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {middleSectionHeader}
      </Box>
      <Box marginTop="10px" padding="10px" backgroundColor="gray">
        {children}
      </Box>
    </Flex>
  );
};

export default MiddleSectionTemplate;
