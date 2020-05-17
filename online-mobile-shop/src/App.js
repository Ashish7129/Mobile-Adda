import React from "react";
import "./App.css";
import ProductContainer from "./components/Products/ProductContainer";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductContainer />
      </div>
    </Provider>
  );
}

export default App;
