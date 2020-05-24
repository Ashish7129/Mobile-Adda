import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  showCartDlg,
  deleteCartProduct,
  updateCartProductQnt,
  setCheckedOutItems,
} from "../../redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const CartRow = (props) => {
  let { item, items } = props;
  return (
    <TableRow>
      <TableCell>
        <img src={item.imageUrls[2]}></img>
      </TableCell>
      <TableCell>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
          <div
            onClick={() => {
              props.dispatch(showCartDlg(false));
            }}
          >
            {item.name}
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          style={{ width: 40 }}
          value={item.quantity}
          onChange={(e) => {
            let quantity = parseInt(e.target.value, 10);
            if (quantity < 0) return;
            props.dispatch(
              updateCartProductQnt({
                id: item.id,
                quantity,
              })
            );
          }}
        />
      </TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>
        <DeleteIcon
          style={{ color: "#FE6B8B" }}
          onClick={() => {
            props.dispatch(deleteCartProduct(item.id));
            props.dispatch(setCheckedOutItems(items));
          }}
        ></DeleteIcon>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
