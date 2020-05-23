import * as CONSTANTS from "./userConstants";

const initialState = {
  checkedOutItems: [],
  loggedInUser: null,
  showOrderConfirmation: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload };
    case CONSTANTS.LOGOUT:
      return { ...state, loggedInUser: null, checkedOutItems: [] };
    case CONSTANTS.SET_CHECKEDOUT_ITEMS:
      return { ...state, checkedOutItems: action.payload };
    case CONSTANTS.SHOW_ORDER_CONFIRMATION:
      return { ...state, showOrderConfirmation: action.payload };
    default:
      return state;
  }
};

export default userReducer;
