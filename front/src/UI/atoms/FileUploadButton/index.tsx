import { useMutation } from '@apollo/client';
import React from 'react';
import { UPLOAD_FILE } from './FileUploadButtonQueries';

export const FileUploadButton = () => {
  // const [singleUploadMutation] = useMutation(SINGLE_UPLOAD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      console.log('file at FILEUPLOAD', file);
      // const {
      //   data: { singleUpload },
      // } = await singleUploadMutation({
      //   variables: {
      //     uploadUserAvatarInput: {
      //       file: file,
      //     },
      //   },
      // });
      await uploadFile({
        variables: {
          file: file,
        },
      });
      console.log(`success!!!! `);
    } else {
      console.log('elselselsel');
    }
  };
  return <input type="file" onChange={fileUpload} />;
};
