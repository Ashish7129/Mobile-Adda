import * as CONSTANTS from "./userConstants";

export const setCheckedOutItems = (items) => ({
  type: CONSTANTS.SET_CHECKEDOUT_ITEMS,
  payload: items,
});
export const setLoggedInUser = (user) => ({
  type: CONSTANTS.SET_LOGGED_IN_USER,
  payload: user,
});
export const logout = () => ({
  type: CONSTANTS.LOGOUT,
});
