import React from 'react';
import { TabList, Tab } from '@chakra-ui/react';
import './index.scss';

export const ChatTabList = ({ ...props }) => {
  const { chatListTabs, handleTabHandler } = props;
  const selectedStyle = {
    color: 'blue.600',
    bg: '#F7FAFC',
    borderBottom: '2px solid #2A69AC',
  };
  return (
    <TabList className="chat-tab-list">
      {chatListTabs.map((tab: { name: string; type: string }) => (
        <Tab
          key={`ChatTabList-${tab.name}`}
          name={tab.name}
          onClick={(e) => handleTabHandler(e)}
          fontSize="1.3rem"
          _selected={selectedStyle}
        >
          {tab.name}
        </Tab>
      ))}
    </TabList>
  );
};
