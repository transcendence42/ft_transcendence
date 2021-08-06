import { useMutation } from '@apollo/client';
import React from 'react';
import { GET_MY_PROFILE } from '../../organisms/MainPageHeader/MainPageHeaderQueries';
import { UPDATE_AVATAR, UPLOAD_FILE } from './FileUploadButtonQueries';
import './index.scss';

export const FileUploadButton = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    refetchQueries: [{ query: GET_MY_PROFILE }],
  });

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      const saveLocation = await uploadFile({
        variables: {
          file: file,
        },
      }).catch(() => {
        console.log('upload file error');
        return;
      });
      console.log('save location: ', saveLocation);
      if (saveLocation) {
        await updateAvatar({
          variables: {
            avatar: process.env.REACT_APP_SERVER_URL + saveLocation.data.uploadFile,
          },
        }).catch(() => {
          console.log('update avatar error');
          return;
        });
      }
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
