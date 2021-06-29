import React from 'react';

export const AlarmChatMessage = ({
  type,
  chatID,
  message,
  createdAt,
}: {
  type: string;
  chatID: string;
  message: string;
  createdAt: string;
}) => {
  return (
    <div>
      {type} {chatID} {message} {createdAt}
    </div>
  );
};
