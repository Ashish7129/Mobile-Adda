import React, { Component } from "react";
import { showConfirmation } from "../../redux";
import Dialog from "@material-ui/core/Dialog";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Order Confirmation Popup with thank you message
const mapStateToProps = (state) => {
  return {
    open: state.user.showOrderConfirmation,
    items: state.cart.cartItems,
  };
};
class OrderConfirmation extends Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.dispatch(showConfirmation(false));
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            <Toolbar style={{ width: 800, maxWidth: "fit-content" }}>
              Order Confirmation
            </Toolbar>
          </AppBar>
          <span style={{ padding: 30, fontSize: 30, textAlign: "center" }}>
            Thanks for ordering, Your OrderId
            <span style={{ color: "red" }}>
              {" "}
              #{Math.random(1000).toString().slice(2, 14)}
            </span>
          </span>
          <Button
            onClick={() => {
              this.props.dispatch(showConfirmation(false));
              this.props.history.push("/");
            }}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              marginBottom: 30,
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
              fontWeight: 200,
            }}
          >
            Continue Shopping
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(OrderConfirmation));
