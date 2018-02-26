import { DIALOG_ACTIONS } from '../constants/DialogConstants';

const initialState = {
  show: false,
  item: {},
  type: undefined,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DIALOG_ACTIONS.SHOW: {
      return payload.show
        ? { ...payload }
        : { ...initialState };
    }
    default: {
      return {
        ...state,
        item: { ...state.item },
      };
    }
  }
};
