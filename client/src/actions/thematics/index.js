import { THEMATICS_ACTIONS } from '../../constants/ThematicsConstants';

export const selectThematic = (thematic) => ({
    type: THEMATICS_ACTIONS.SELECT,
    payload: thematic
});
