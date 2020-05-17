import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProductContainer from "./components/Products/ProductContainer";
import Header from "./components/Header/HeaderContainer";
import Footer from "./components/Footer/FooterContainer";
import Login from "./components/Login/Login";
// import { ProductDetail } from "./components/Products/ProductDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <div className="content">
          {/* <CartDialog /> */}
          <Switch>
            <Route path="/" exact component={ProductContainer} />
            {/* <Route path="/product/:id" component={ProductDetail} /> */}
            <Route path="/login" component={Login} />
            {/*<ProtectedRoute path="/order" component={Order} />*/}
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
