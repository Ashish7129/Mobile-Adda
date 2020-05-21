import * as CONSTANTS from "./cartConstants";

export const addProductInCart = (product) => ({
  type: CONSTANTS.ADD_PRODUCT_IN_CART,
  payload: product,
});
export const showCartDlg = (status) => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: status,
});
export const deleteCartProduct = (id) => ({
  type: CONSTANTS.DELETE_CART_PRODUCT,
  payload: id,
});
export const deleteCart = (items) => ({
  type: CONSTANTS.DELETE_CART,
  payload: items,
});
export const updateCartProductQnt = (object) => ({
  type: CONSTANTS.UPDATE_CART_PRODUCT_QUANTITY,
  payload: object,
});
