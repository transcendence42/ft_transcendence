import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($uploadUserAvatarInput: UploadUserAvatarInput!) {
    singleUpload(uploadUserAvatarInput: $uploadUserAvatarInput) {
      success
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
