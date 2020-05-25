import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems, deleteCart, showConfirmation } from "../../redux";
import OrderConfirmation from "./OrderConfirmation";
import ReplyIcon from "@material-ui/icons/Reply";

const mapStateToProps = (state) => {
  return {
    checkedOutItems: state.user.checkedOutItems,
  };
};

class ConnectedOrder extends Component {
  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    let gstPrice = totalPrice !== 0 ? Math.ceil(totalPrice * 0.18) : 0;
    if (this.props.checkedOutItems.length == 0) {
      return (
        <div style={{ padding: 10 }}>
          <div style={{ fontSize: 24, marginTop: 10, marginBottom: 10 }}>
            No Products to Checkout
          </div>
          <Button
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
              fontWeight: 200,
              margin: 5,
              marginTop: 30,
            }}
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            {" "}
            <ReplyIcon
              color="secondary"
              style={{ marginRight: 5, color: "white" }}
            />
            Continue Shopping
          </Button>
        </div>
      );
    }
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10, marginBottom: 10 }}>
          Checkout Summary
        </div>
        <Table>
          <TableHead
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product(Mobile)</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.imageUrls[2]} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "grey",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 10,
          }}
        >
          Incl GST: Rs. {gstPrice}
        </div>
        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 5,
            fontSize: 22,
          }}
        >
          Total price: Rs. {totalPrice}
        </div>
        <Button
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
            fontWeight: 200,
            margin: 5,
            marginTop: 30,
          }}
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
            this.props.dispatch(deleteCart([]));
            this.props.dispatch(showConfirmation(true));
          }}
        >
          Place Order
        </Button>
        <Button
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
            fontWeight: 200,
            margin: 5,
            marginTop: 30,
          }}
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
            this.props.dispatch(deleteCart([]));
          }}
        >
          Delete Cart
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
