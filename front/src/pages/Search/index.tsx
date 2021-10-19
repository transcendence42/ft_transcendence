import React, { useState } from 'react';

const Search: React.FC = (props) => {
  const [userName, setUserName] = useState('');

  const findUser = (e) => {
    if (e.code === 'Enter') {
      window.location.replace(`${process.env.REACT_APP_CLIENT_URL}/profile/${userName}`);
    }
  };

  return (
    <>
      <p style={{ marginRight: '10px' }}>검색할 유저의 ID를 입력하세요:</p>
      <input
        style={{
          border: '1px solid black',
        }}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyPress={(e) => findUser(e)}
      />
    </>
  );
};

export default Search;
