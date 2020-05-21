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
    case CONSTANTS.SHOW_CART_DLG:
      return { ...state, showCartDialog: action.payload };
    case CONSTANTS.DELETE_CART_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case CONSTANTS.UPDATE_CART_PRODUCT_QUANTITY: {
      let index = state.cartItems.findIndex((x) => x.id === action.payload.id);

      // User wants to update quantity of existing item.
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: action.payload.quantity,
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // If we couldn't find such item, do nothing.
      return state;
    }
    default:
      return state;
  }
};

export default cartReducer;
