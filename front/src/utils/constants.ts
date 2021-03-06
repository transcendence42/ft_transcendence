/*
 ** toast
 */

export const TOAST_DURATION = 3000;
export const TOAST_SEND_MESSAGE_TITLE = '메세지 알림';
export const TOAST_SEND_MESSAGE_DESCRIPTION = '메세지를 성공적으로 보냈습니다.';
export const TOAST_ADD_FRIEND_TITLE = '친구 추가 알림';
export const TOAST_ADD_FRIEND_DESCRIPTION = '친구 추가 완료되었습니다.';
export const TOAST_PLAY_GAME_TITLE = '게임 알림';
export const TOAST_PLAY_GAME_DESCRIPTION = '게임 신청을 완료했습니다.';

/*
 ** URL
 */

export const BASE_URL = 'http://127.0.0.1:5500';
export const LOGIN_URL = `/auth/login`;
// export const LOGIN_URL = `${BASE_URL}/auth/login`;
// export const GRAPHQL_URL = `${BASE_URL}/graphql`;
export const GRAPHQL_URL = `/graphql`;
export const SUBSCRIPTION_URL = 'ws://127.0.0.1:5500/subscriptions';

/*
 ** Spinner
 */

export const SPINNER_COLOR = 'gray.500';
export const SPINNER_ERROR_COLOR = 'red.500';

/*
 ** Alarm
 */

export const ALARM_TITLE_BACKGROOUND_COLOR = 'white';
export const ALARM_BACKGROUND_COLOR = 'gray.50';
export const ALARM_PROFILE_BACKGROUND_COLOR = 'gray.100';
export const ALARM_PROFILE_TIME_COLOR = 'gray.400';
export const ALARM_CHAT_MESSAGE_BACKGROUND_COLOR = 'gray.100';
export const ALARM_MESSAGE_BACKGROUND_COLOR = 'gray.200';

export const ALARM_MESSAGE_LOGIN_USER_STATE_COLOR = 'green.500';
export const ALARM_MESSAGE_PENDING_USER_STATE_COLOR = 'orange.300';
export const ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR = 'gray.300';

export const ALARM_MIN_WIDTH = '390px';
export const ALARM_MAX_WIDTH = '390px';
export const ALARM_WIDTH = '390px';
export const ALARM_HEIGHT = '100vh';
export const ALARM_MESSAGE_WIDTH = '100%';
export const ALARM_MESSAGE_HEIGHT = '64px';

export const ALARM_TITLE_FONTSIZE = '1rem';
export const ALARM_PROFILE_NICKNAME_FONTSIZE = '1rem';
export const ALARM_PROFILE_CONTENT_FONTSIZE = '12px';
export const ALARM_CHAT_TITLE_CONTENT_FONTSIZE = '12px';
export const ALARM_CHAT_MESSAGE_FONTSIZE = '14px';
export const ALARM_CHAT_MESSAGE_ID_FONTSIZE = '9px';
export const ALARM_CHAT_MESSAGE_TIME_FONTSIZE = '9px';
export const ALARM_CHAT_MESSAGE_NOTIFICATION_FONTSIZE = '10px';
export const ALARM_MESSAGE_TITLE_FONTSIZE = '14px';
export const ALARM_MESSAGE_CONTENT_FONTSIZE = '12px';
export const ALARM_USER_LIST_TITLE_COUNT_FONTSIZE = '12px';
export const ALARM_USER_NICKNAME_FONTSIZE = '14px';

export const ALARM_TITLE_FONTWEIGHT = 'bold';
export const ALARM_CONTENT_FONTWEIGHT = 'semibold';

export const ALARM_CHAT_BOX_HEIGHT = '258px';

/*
 ** CHAT
 */

export const CHAT_MY_LIST_COLUMNS = ['#', '제목', '인원', '방장', ''];
export const CHAT_TOTAL_LIST_COLUMNS = ['#', '제목', '인원', '방장'];

export const CHAT_TOP_PANEL_TABS = [
  {
    name: '나의채팅방',
    type: '',
  },
  {
    name: '1:1 채팅방',
    type: 'dm',
  },
];
export const CHAT_BOTTOM_PANEL_TABS = [
  {
    name: '전체채팅방',
    type: '',
  },
  {
    name: '공개채팅방',
    type: 'public',
  },
  {
    name: '비공개채팅방',
    type: 'private',
  },
];

export const CHAT_LIST_TYPE_MY_LIST = 'myList';
export const CHAT_LIST_TYPE_DM_LIST = 'dmList';
export const CHAT_LIST_TYPE_TOTAL_LIST = 'totalList';
export const CHAT_LIST_TYPE_PUBLIC_LIST = 'publicList';
export const CHAT_LIST_TYPE_PRIVATE_LIST = 'privateList';

export const CHAT_PAGE_OUTER_LIMIT = 1;
export const CHAT_PAGE_INNER_LIMIT = 1;
export const CHAT_PAGE_SIZE = 3;

export const CHAT_INVALID_NAME_ERROR_MSG = '유효하지 않은 이름입니다.';
export const CHAT_INVALID_PASSWORD_ERROR_MSG = '유효하지 않은 비밀번호입니다.';

export const CHAT_DEFAULT_PAGE = 1; // 첫번째 페이지
export const CHAT_DEFAULT_TYPE = '';

export const EMPTY_CHAT_UUID = '';
