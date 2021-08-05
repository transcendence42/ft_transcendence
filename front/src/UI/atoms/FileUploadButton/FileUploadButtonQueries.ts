import { gql } from '@apollo/client';

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($avatar: String!) {
    updateAvatar(avatar: $avatar) {
      avatar
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
