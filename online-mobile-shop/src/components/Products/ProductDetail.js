import React, { Component, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return {
    productData: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

class ProductDetailComponent extends Component {
  state = {
    loading: false,
    product: null,
    quantity: 1,
    allProducts: [],
  };
  render() {
    this.setState({ allProducts: this.props.productData.products });
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    let product = this.props.allProducts.filter(
      (x) => x.id === this.props.match.params.id
    );
    return (
      <div>
        {" "}
        {product.name}
        {/* {this.props.productData.map((x) => (
          <div>x.name</div>
        ))} */}
        {/* {product.name} {this.props.match.params.id} */}
      </div>
    );
  }
}

ProductDetailComponent.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
};

let ProductDetail = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetailComponent)
);
export default ProductDetail;
