import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProductContainer from "./components/Products/ProductContainer";
import Header from "./components/Header/HeaderContainer";
import Footer from "./components/Footer/FooterContainer";
import Login from "./components/Login/Login";
import ProductDetail from "./components/Products/ProductDetail";
import CartDialog from "./components/Cart/CartDialog";
import Order from "./components/Order/Order";
import AuthGuard from "./components/Order/AuthGuardCheckout";
import OrderConfirmation from "./components/Order/OrderConfirmation";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <div className="container">
          <CartDialog />
          <OrderConfirmation />
          <Switch>
            <Route path="/" exact component={ProductContainer} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/login" component={Login} />
            <AuthGuard path="/order" component={Order} />
            <Route
              component={() => (
                <div style={{ padding: 20 }}>Page not found</div>
              )}
            />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
