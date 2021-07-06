\du
\dt

SELECT * FROM alarm;
SELECT * FROM game;
SELECT * FROM user;

DROP TABLE alarm;
DROP TABLE game;
DROP TABLE user;

INSERT INTO alarm ("userID", title, content, checked, "type", link) VALUES
('holee', '친구요청', '42_Dall님이 친구 요청을 보냈습니다.', false, 'addFriend', '/profile'),
('holee', '게임패배', 'jwon님과 경기에서 패배했습니다.', false, 'defeat', '/profile'),
('holee', '게임승리', 'Polarbear 님과 경기에서 승리했습니다.', false, 'win', '/profile'),
('holee', '게임승리', 'Polarbear 님과 경기에서 승리했습니다.', false, 'win', '/profile');