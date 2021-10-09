import React from 'react';
import { Button } from '@chakra-ui/react';
import { CREATE_ALARM, CREATE_FOLLOW } from '../Alarm/AlarmChatPeople/AlarmChatPeopleQueries';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USERID } from '../../../templates/ChatTemplate/ChatTemplateQueries';

const FollowButton = ({ followingID }: { followingID: string }) => {
  console.log('follow Btn: ', followingID);
  const { data, error, loading } = useQuery(GET_CURRENT_USERID);
  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [createAlarm] = useMutation(CREATE_ALARM);

  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log('error');
  }

  const handleAddFriend = async () => {
    await createFollow({
      variables: {
        users: {
          followerID: data?.me.userID,
          followingID: followingID,
        },
      },
    }).then((res) => {
      if (!res.data.createFollow.checked) {
        // 서로 친구 상태가 아닌 경우 알람 생성
        createAlarm({
          variables: {
            alarm: {
              userID: followingID,
              title: '친구요청',
              content: `${data?.me.nickname}님이 친구 요청을 보냈습니다.`,
              type: 'addFriend',
              link: `/profile/${data?.me.userID}`,
            },
          },
        });
      }
    });
  };

  return (
    <>
      <Button onClick={handleAddFriend}>follow</Button>
    </>
  );
};

export default FollowButton;
