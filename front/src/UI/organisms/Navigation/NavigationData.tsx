import React from 'react';
import { PhoneIcon, ChatIcon, Search2Icon, BellIcon, IconProps } from '@chakra-ui/icons';

export interface Iicon {
  title: string;
  icon: React.FunctionComponentElement<IconProps>;
  link: string;
}

export const NavigationData: Iicon[] = [
  {
    title: 'home',
    icon: React.createElement(PhoneIcon),
    link: '/',
  },
  {
    title: 'Profile',
    icon: React.createElement(BellIcon),
    link: '/profile',
  },
  {
    title: 'Chat',
    icon: React.createElement(ChatIcon),
    link: '/chat',
  },
  {
    title: 'Search',
    icon: React.createElement(Search2Icon),
    link: '/search',
  },
];
