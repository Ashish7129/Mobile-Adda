import React, { Component, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux";
import { withRouter } from "react-router-dom";

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
    product: [],
    quantity: 1,
    allProducts: [],
  };

  componentDidMount() {
    this.setState({
      allProducts: this.props.productData.products,
      loading: this.props.productData.loading,
      product: this.props.productData.products.filter(
        (x) => x.id == this.props.match.params.id
      ),
    });
  }

  render() {
    // if (!this.state.loading) {
    //   return <CircularProgress className="circular" />;
    // } else if (this.state.loading) {
    console.log("Products :" + this.state.allProducts);
    console.log(this.state.product);
    return this.state.product.map((prod) => (
      <div key={prod.id}>
        <div className="leftPart">
          <img src={prod.imageUrls[0]}></img>
        </div>{" "}
        {prod.name}
      </div>
    ));
  }
}

let ProductDetail = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetailComponent)
);
export default ProductDetail;
