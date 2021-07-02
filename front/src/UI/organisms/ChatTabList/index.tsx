import React from 'react';
import { TabList, Tab } from '@chakra-ui/react';
import './index.scss';

export const ChatTabList = ({ tabs }: { tabs: string[] }) => {
  const selectedStyle = {
    color: 'blue.600',
    bg: '#F7FAFC',
    borderBottom: '2px solid #2A69AC',
  };
  return (
    <TabList className="chat-tab-list">
      {tabs.map((tabName) => (
        <Tab key={tabName} fontSize="1.3rem" _selected={selectedStyle}>
          {tabName}
        </Tab>
      ))}
    </TabList>
  );
};
