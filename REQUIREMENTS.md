# 요구 사항

## In this subject, you will need to build a website for the mighty pong contest

## Rules

- [ ] 가장 최신의 stable 라이브러리나 프레임 워크를 써야한다.
- [ ] Backend는 NestJS로 구현해야한다.
- [ ] Database는 PostgreSQL을 써야한다.
- [ ] Frontend는 typescript framework를 써야한다.
- [ ] 웹사이트는 SPA(single page app)이어야 한다. 웹브라우저의 뒤로가기 버튼을 사용할 수 있어야 한다
- [ ] 웹사이트는 Google Chrome, Firefox, Safari과 호환되어야한다.
- [ ] 웹사이트에 대한 모든 에러나 경고는 처리돼야한다.
- [ ] 라이브러리는 자유롭게 사용해도 된다.
- [ ] 모든건 `docker-compose up –build 하나로 실행 돼야한다.

### Main Page

- [ ] 홈페이지는 관리자 페이지가 있어야 한다.
- [ ] 브라우저에서 뒤로가기 버튼을 눌렀을 때 이전 페이지로 가야한다.
- [ ] 채팅은 실시간 채팅이 가능해야 한다.

### Security concerns

- [ ] 데이터베이스에 저장되는 비밀번호는 모두 암호화돼야한다.
- [ ] 웹사이트는 SQL injections으로부터 보호돼야한다.
- [ ] form이나 사용자 input에 대해 서버 사이드에서 유효성 검사를 해야한다.

### User Account

- [ ] **로그인 구현**
- [ ] 42 intranet으로 OAuth 사용
- [ ] 2-factor authentication 구현
  - [ ] google authenticator, SMS, email etc...
- [ ] **프로필**
- [ ] 사용자 아이디
  - [ ] 사용자 아이디는 고유해야 한다.
- [ ] 사용자 승리, 패배 기록 페이지
- [ ] ladder level, achievements
- [ ] **아바타 이미지**
  - [ ] 아이디 생성 시 기본 이미지 생성
  - [ ] 사용자가 기본 이미지 변경 가능
- [ ] **친구 추가 구현**
  - [ ] 친구 상태 표시 (online, offline, in a game...)
  - [ ] 친구 페이지 접속 가능

### Chat

- [ ] **채널 생성**
  - [ ] 만든 사용자가 방장으로 지정
  - [ ] 방장은 채널의 비밀번호를 삭제/추가/변경 할 수 있다.
  - [ ] 방장은 사용자를 관리자로 지정할 수 있다.
  - [ ] 관리자는 여러명이서 할 수 있다.
  - [ ] 관리자는 사용자를 일정시간동아 음소거할 수 있다.
  - [ ] 관리자는 사용자를 벤할 수 있다.
- [ ] **모드**
  - [ ] public
  - [ ] private
  - [ ] protected by a password
- [ ] **기능**
  - [ ] 다른 사용자에게 직접적으로 메세지 보내는 기능 구현
  - [ ] block 기능 구현
    - [ ] block 당하면 더 이상 메세지를 볼 수 없다.
  - [ ] 채팅창안에서 다른 사용자에게 탁구게임을 제안 할 수 있다.
- [ ] 채팅 인터페이스에서 다른 사용자의 프로필을 볼 수 있어야한다.

## Game

- [ ] 핑퐁 게임은 실시간으로 다른 사람들과 게임을 할 수 있어야한다.
- [ ] 매칭 시스템 구현
  - [ ] 게임큐에 들어가서 자동적으로 다른 사용자와 매칭돼야한다.
- [ ] 게임 구현
  - [ ] 1972 핑퐁 게임 종류여야한다.
  - [ ] 옵션 power-ups, different maps 구현 (선택)
  - [ ] 옵션없는 순수 핑퐁 게임을 사용자가 진행할 수 있어야한다.
- [ ] 관전기능 구현
