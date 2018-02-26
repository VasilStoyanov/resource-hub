import { DIALOG_ACTIONS } from '../../constants/DialogConstants';

export const showDialog = data => ({
  type: DIALOG_ACTIONS.SHOW,
  payload: data,
});
