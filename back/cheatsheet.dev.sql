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

INSERT INTO game ("playerOneID", "playerOneScore", "playerTwoID", "playerTwoScore") VALUES
('holee', 0, 'yshin', 1),
('yechoi', 3, 'yshin', 7),
('holee', 2, 'jwon', 5),
('yshin', 6, 'jwon', 4);

INSERT INTO public.user ("userID", nickname, "ladderRating", "totalWin", "totalLose", avatar, "userState") VALUES
('jwon', 'junho won', 800, 5, 6, '', 'logout'),
('yechoi', 'yeji choi', 1200, 6, 5, '', 'login'),
('holee', 'hochan lee', 1600, 7, 4, '', 'playing'),
('yshin', 'younghak shin', 1800, 8, 4, 'https://cdn.intra.42.fr/users/medium_yshin.jpg', 'playing'),
('devil', 'who i am', -2400, 0, 12, '', 'login');

-- 친구 추가

-- mutation($follow: CreateFollowInput!) {
--   createFollow(createFollowInput: $follow) {
--     following {
--       userID
--     }
--     follower {
--       userID
--     }
--   }
-- }

-- {
--   "follow": {
--     "followingID": "holee",
--     "followerID": "yechoi"
--   }
-- }

-- 추가 확인

-- {
--   follows {
--     follower {
--       index
--       userID
--     }
--     following {
--       index
--       userID
--     }
--     checked
--     blocked
--   }
-- }

INSERT INTO chat (name, password, "isAlive", type, "ownerID", "adminID", "userID")
  VALUES
    ('채팅방1', '', true, 'public', 'yshin', '{}', '{holee, yshin, devil}'),
    ('채팅방2', '', false, 'public', 'yshin', '{}', '{yshin}'),
    ('채팅방3', '', true, 'public', 'yshin', '{jwon, yechoi}', '{holee, jwon, yechoi, yshin, devil}'),
    ('채팅방4', '1234', true, 'private', 'holee', '{}', '{holee, jwon, yechoi, yshin}'),
    ('채팅방5', '1234', true, 'private', 'jwon', '{holee, yechoi}', '{holee, jwon, yechoi}'),
    ('holee,jwon', '', true, 'dm', 'holee', '{}', '{holee, jwon}'),
    ('yshin,holee', '', true, 'dm', 'yshin', '{}', '{yshin, holee}')
;

--uuid 컬럼은 uuid 형식을 따르며, chat 테이블의 uuid 컬럼을 참조하므로 서브 쿼리문을 작성하였습니다.
INSERT INTO chat_log("chatUUID", "userID", "message", "type")
  VALUES
    ((SELECT uuid FROM chat LIMIT 1), 'yshin', 'yshin 채팅방1 메시지', 'message'),
    ((SELECT uuid FROM chat LIMIT 1), 'holee', 'holee 채팅방1 메시지', 'message'),
    ((SELECT uuid FROM chat LIMIT 1 OFFSET 3), 'yshin', 'yshin 채팅방3 메시지', 'message'),
    ((SELECT uuid FROM chat LIMIT 1 OFFSET 3), 'jwon', 'jwon 채팅방3 메시지', 'message'),
    ((SELECT uuid FROM chat LIMIT 1 OFFSET 3), 'yechoi', 'yechoi 채팅방3 메시지', 'message')
;
