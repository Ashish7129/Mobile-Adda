import React, { Component } from "react";
import { showConfirmation } from "../../redux";
import Dialog from "@material-ui/core/Dialog";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
          Thanks for ordering Your orderId {Math.random(1000)}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(OrderConfirmation));
