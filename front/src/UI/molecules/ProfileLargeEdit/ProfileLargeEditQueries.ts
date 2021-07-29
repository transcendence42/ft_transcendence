import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: UploadUserAvatarInput!) {
    singleUpload(uploadUserAvatarInput: $file) {
      filename
    }
  }
`;

export const UPDATE_NICKNAME = gql`
  mutation ($user: UpdateUserInput!) {
    updateUser(updateUserInput: $user) {
      userID
      nickname
    }
  }
`;
