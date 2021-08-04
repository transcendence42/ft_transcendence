import { useMutation } from '@apollo/client';
import React from 'react';
import { UPLOAD_FILE } from './FileUploadButtonQueries';
import './index.scss';

export const FileUploadButton = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      console.log('file at FILEUPLOAD', file);
      const result = await uploadFile({
        variables: {
          file: file,
        },
      });
      console.log('this is result ', result);
      console.log(`success!!!! ${result}`);
    } else {
      console.log('elselselsel');
    }
  };
  return (
    <>
      <div className="upload-button-container">
        <label htmlFor="input-file">
          <span role="img" aria-label="camera">
            📷
          </span>
        </label>
        <input type="file" id="input-file" onChange={fileUpload} />
      </div>
    </>
  );
};
