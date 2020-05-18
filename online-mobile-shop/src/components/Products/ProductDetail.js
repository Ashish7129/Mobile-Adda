import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

class ProductDetailComponent extends Component {
  state = {
    loading: false,
    product: null,
    quantity: 1,
  };

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return <div> Product Detail Page </div>;
  }
}

let ProductDetail = connect()(ProductDetailComponent);
export default ProductDetail;
