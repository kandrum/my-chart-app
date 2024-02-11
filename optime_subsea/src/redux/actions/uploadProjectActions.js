import { SET_UPLOAD_PROJECT } from '../actionTypes';

export const setUploadProject = (uploadProject) => ({
  type: SET_UPLOAD_PROJECT,
  payload: uploadProject,
});
