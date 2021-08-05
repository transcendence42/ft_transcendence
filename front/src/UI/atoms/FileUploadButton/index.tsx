import { useMutation } from '@apollo/client';
import React from 'react';
import { UPDATE_AVATAR, UPLOAD_FILE } from './FileUploadButtonQueries';
import './index.scss';

export const FileUploadButton = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      console.log('file at FILEUPLOAD', file);
      const saveLocation = await uploadFile({
        variables: {
          file: file,
        },
      }).catch(() => {
        console.log('upload FIle error');
        return;
      });
      console.log('save location: ', saveLocation);
      if (saveLocation) {
        await updateAvatar({
          variables: {
            avatar: process.env.REACT_APP_SERVER_URL + saveLocation.data.uploadFile,
          },
        }).catch(() => {
          console.log('update Avatar error');
          return;
        });
      }
      console.log(`success!!!! ${saveLocation}`);
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
