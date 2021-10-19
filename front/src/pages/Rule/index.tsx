import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

const playPongUrl =
  'https://user-images.githubusercontent.com/22424891/124421776-1e20c480-dd9d-11eb-915a-cea42d366af7.mov';

const Rule: React.FC = (props) => {
  return (
    <section>
      <header style={{ margin: '5px' }}>
        <Heading size="2xl">How To Play</Heading>
        <Text fontSize="3xl"> ----------------------- </Text>
      </header>

      <section>
        <video width="800" controls autoPlay>
          <source src={playPongUrl} type="video/mp4" />
          <track default kind="captions" srcLang="en" src="" />
        </video>

        <Text fontSize="3xl">- 게임이 시작되면 각각의 플레이어들은 우측, 좌측 중 하나의 탁구채를 배정받습니다.</Text>
        <Text fontSize="3xl">- 탁구채는 마우스로 상하 방향으로 움직일 수 있습니다.</Text>
        <Text fontSize="3xl">- 먼저, 3점을 내면 승리합니다.</Text>
      </section>
    </section>
  );
};

export default Rule;
