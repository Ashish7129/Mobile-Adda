import { combineReducers } from "redux";
import productReducer from "./products/productReducer";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
