import React, { Component, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { fetchProducts, addProductInCart } from "../../redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";

const mapStateToProps = (state) => {
  return {
    productData: state.products,
  };
};

class ProductDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      product: [],
      quantity: 1,
      allProducts: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        allProducts: this.props.productData.products,
        loading: this.props.productData.loading,
        product: this.props.productData.products.filter(
          (x) => x.id == this.props.match.params.id
        ),
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts());
    this.setState({
      allProducts: this.props.productData.products,
      loading: this.props.productData.loading,
      product: this.props.productData.products.filter(
        (x) => x.id == this.props.match.params.id
      ),
    });
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    if (!this.state.product) {
      return null;
    }
    console.log("Products :" + this.state.allProducts);
    console.log(this.state.product);
    return this.state.product.map((prod) => (
      <div key={prod.id}>
        <div style={{ display: "flex", marginTop: 100, marginBottom: 20 }}>
          <div>
            <img src={prod.imageUrls[1]} alt="" style={{ width: 200 }} />
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginBottom: 0,
                marginTop: 33,
                fontSize: 51,
              }}
            >
              {prod.name}
            </div>
            <Rating
              name="read-only"
              value={prod.rating}
              readOnly
              style={{ marginBottom: 20 }}
            />
            <div
              style={{
                fontSize: 30,
              }}
            >
              Rs {prod.price}
            </div>
            <div style={{ flex: 1, flexDirection: "column" }}>
              <TextField
                type="number"
                value={this.state.quantity}
                style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                label="Quantity"
                inputProps={{ min: 1, max: 10, step: 1 }}
                onChange={(e) => {
                  this.setState({ quantity: parseInt(e.target.value) });
                }}
              />
              <Button
                style={{ width: 170, marginTop: 29, marginLeft: 20 }}
                color="secondary"
                variant="outlined"
                onClick={() => {
                  this.props.dispatch(
                    addProductInCart({
                      ...prod,
                      quantity: this.state.quantity,
                    })
                  );
                }}
              >
                <AddShoppingCartIcon
                  color="secondary"
                  style={{ marginRight: 5 }}
                />{" "}
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

let ProductDetail = withRouter(
  connect(mapStateToProps)(ProductDetailComponent)
);
export default ProductDetail;
