import { useMutation } from '@apollo/client';
import React from 'react';
import { SINGLE_UPLOAD } from './FileUploadButtonQueries';

export const FileUploadButton = () => {
  const [singleUploadMutation] = useMutation(SINGLE_UPLOAD);

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      console.log('file at FILEUPLOAD', file);
      const {
        data: { singleUpload },
      } = await singleUploadMutation({
        variables: {
          uploadUserAvatarInput: {
            file: file,
          },
        },
      });
      console.log(`success!!!! ${singleUpload.filename}`);
    } else {
      console.log('elselselsel');
    }
  };
  return <input type="file" onChange={fileUpload} />;
};
