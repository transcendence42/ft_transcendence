import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($uploadUserAvatarInput: UploadUserAvatarInput!) {
    singleUpload(uploadUserAvatarInput: $uploadUserAvatarInput) {
      success
    }
  }
`;
