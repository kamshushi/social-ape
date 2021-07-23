import { CLEAR_ERRORS } from "../actionTypes";

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
