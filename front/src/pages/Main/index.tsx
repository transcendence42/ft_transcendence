import React from 'react';
import MainPageTemplate from '../../templates/Main';
import ProfileLarge from '../../UI/organisms/ProfileLarge';
import MainButtons from '../../UI/molecules/MainButtons';

const Main: React.FC = () => {
  return (
    <MainPageTemplate mainHeader={<ProfileLarge rightComponent={<MainButtons />} />}>
      <div>game status</div>
    </MainPageTemplate>
  );
};

export default Main;
