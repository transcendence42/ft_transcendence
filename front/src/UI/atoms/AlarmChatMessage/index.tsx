import React from 'react';

import { Box, Text, Flex } from '@chakra-ui/react';

const Message = ({ chatID, message, createdAt }: { chatID: string; message: string; createdAt: string }) => {
  return (
    <Flex flexDirection="column">
      <Text fontSize="11px" fontWeight="semibold">
        {chatID}
      </Text>
      <Flex alignItems="flex-end">
        <Box p="2" border="1px solid black" borderRadius="15%" bg="gray.100">
          {message}
        </Box>
        <Text pl="1" pr="1" fontSize="9px">
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

// const OwnerMessage = ({ chatID, message, createdAt }: { chatID: string; message: string; createdAt: string }) => {
//   return (
//     <Flex flexDirection="column" alignItems="flex-end">
//       <Text fontSize="11px" fontWeight="semibold">
//         {chatID}
//       </Text>
//       <Flex alignItems="flex-end" flexDirection="row-reverse">
//         <Box p="2" border="1px solid black" borderRadius="15%" bg="gray.100">
//           {message}
//         </Box>
//         <Text pl="1" pr="1" fontSize="9px">
//           {createdAt}
//         </Text>
//       </Flex>
//     </Flex>
//   );
// };

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
  console.log(type);
  return <Message chatID={chatID} message={message} createdAt={createdAt} />;
  // if (type === 'message') {
  //   return <Message chatID={chatID} message={message} createdAt={createdAt} />;
  // }
};

// else if (type === 'ownerMessage') {
//   return <OwnerMessage chatID={chatID} message={message} createdAt={createdAt} />;
// }
// return <OwnerMessage chatID={chatID} message={message} createdAt={createdAt} />;
// return <Text>hi..</Text>;
// else if (type === 'Notification') {
//   return <Text>noti</Text>;
// }
