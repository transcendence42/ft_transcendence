import React from 'react';
import { TabList, Tab } from '@chakra-ui/react';

export const ChatRoomTabList = ({ tabs }: { tabs: string[] }) => {
  return (
    <TabList style={{ color: '#A2A8B0', borderBottom: '1px solid #A2A8B0', fontSize: '1.5rem', width: 'max-content' }}>
      {tabs.map((tabName) => (
        <Tab
          key={tabName}
          style={{ fontSize: '1.3rem' }}
          _selected={{
            color: 'blue.600',
            bg: '#F7FAFC',
            borderBottom: '2px solid #2A69AC',
          }}
        >
          {tabName}
        </Tab>
      ))}
    </TabList>
  );
};
