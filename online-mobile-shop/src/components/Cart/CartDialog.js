import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { showCartDlg, setCheckedOutItems } from "../../redux";
import { withRouter } from "react-router-dom";
import CartRow from "./CartRow";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ReplyIcon from "@material-ui/icons/Reply";

const mapStateToProps = (state) => {
  return { open: state.cart.showCartDialog, items: state.cart.cartItems };
};

class ConnectedCartDialog extends Component {
  render() {
    let totalPrice = this.props.items.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    let gstPrice = totalPrice !== 0 ? Math.ceil(totalPrice * 0.18) : 0;

    if (this.props.items.length == 0) {
      return (
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.dispatch(setCheckedOutItems(this.props.items));
            this.props.dispatch(showCartDlg(false));
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            <Toolbar>
              <ShoppingCartIcon
                fontSize="large"
                style={{ color: "white", marginRight: 20 }}
              />
              Shopping Cart
            </Toolbar>
          </AppBar>

          <div
            style={{
              maxHeight: 400,
              padding: 10,
              overflow: "auto",
            }}
          >
            <div
              style={{ display: "flex", padding: 20, alignSelf: "flex-end" }}
            >
              <Button
                style={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                  fontWeight: 200,
                  marginRight: 10,
                }}
                onClick={() => {
                  this.props.dispatch(showCartDlg(false));
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
          </div>
        </Dialog>
      );
    }
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.dispatch(setCheckedOutItems(this.props.items));
            this.props.dispatch(showCartDlg(false));
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            <Toolbar>
              <ShoppingCartIcon
                fontSize="large"
                style={{ color: "white", marginRight: 20 }}
              />
              Shopping Cart
            </Toolbar>
          </AppBar>

          <div
            style={{
              maxHeight: 400,
              padding: 10,
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead
                style={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                }}
              >
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product(Mobile)</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.items.map((item, index) => {
                  return <CartRow item={item} key={item.id} {...this.props} />;
                })}
              </TableBody>
            </Table>
          </div>

          <div
            style={{ display: "flex", paddingRight: 20, alignSelf: "flex-end" }}
          >
            <div
              style={{
                flex: 1,
                fontSize: 10,
                color: "grey",
              }}
            >
              {" "}
              Incl. GST: Rs {gstPrice}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: 20,
              color: "red",
              alignSelf: "flex-end",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              {" "}
              Total Price: Rs {totalPrice}
            </div>
          </div>
          <div style={{ display: "flex", padding: 20, alignSelf: "flex-end" }}>
            <Button
              style={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
                fontWeight: 200,
                marginRight: 10,
              }}
              onClick={() => {
                this.props.dispatch(showCartDlg(false));
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
            <Button
              style={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
                fontWeight: 200,
              }}
              disabled={totalPrice === 0}
              onClick={() => {
                this.props.dispatch(showCartDlg(false));
                this.props.dispatch(setCheckedOutItems(this.props.items));
                this.props.history.push("/order");
              }}
            >
              Checkout
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
const CartDialog = withRouter(connect(mapStateToProps)(ConnectedCartDialog));
export default CartDialog;
