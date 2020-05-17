import * as CONSTANTS from "./cartConstants";

const initialState = {
  cartItems: [],
  showCartDialog: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_PRODUCT_IN_CART: {
      let productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[productIndex] = {
          ...cloneCartItems[productIndex],
          quantity:
            state.cartItems[productIndex].quantity + action.payload.quantity,
        };

        return { ...state, cartItems: cloneCartItems };
      }
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    }
    default:
      return state;
  }
};

export default cartReducer;
