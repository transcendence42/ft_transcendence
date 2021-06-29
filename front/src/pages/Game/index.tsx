import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';

const Game: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<GamePageHeader />}>
      <img
        alt="pingpong"
        src="https://image.winudf.com/v2/image/Y29tLnBpbmhhc29mdC5waW5ncG9uZ29ubGluZV9zY3JlZW5fMV8xNTMxNTM3MTA3XzAyOA/screen-1.jpg?fakeurl=1&type=.jpg"
      />
    </MiddleSection>
  );
};

export default Game;
