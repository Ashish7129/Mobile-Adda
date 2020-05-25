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
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <div className="container">
          <Switch>
            <Route path="/" exact component={ProductContainer} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/login" component={Login} />
            <AuthGuard path="/order" component={Order} />
            <Route
              component={() => (
                <div
                  style={{
                    margin: "auto",
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div class="full-screen"></div>
                  <div>
                    <span>No Page Found </span>
                    <a href="/" style={{ textDecoration: "none" }}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                          color: "white",
                          fontWeight: 200,
                        }}
                      >
                        Continue Shopping
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            />
          </Switch>
          <CartDialog />
          <OrderConfirmation />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
