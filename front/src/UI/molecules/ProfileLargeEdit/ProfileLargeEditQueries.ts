import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($uploadUserAvatarInput: UploadUserAvatarInput!) {
    singleUpload(uploadUserAvatarInput: $uploadUserAvatarInput) {
      success
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
