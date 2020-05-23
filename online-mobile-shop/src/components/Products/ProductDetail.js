import React, { Component, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { fetchProducts, addProductInCart } from "../../redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import TextField from "@material-ui/core/TextField";

const mapStateToProps = (state) => {
  return {
    productData: state.products,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchProducts: () => dispatch(fetchProducts()),
//   };
// };

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
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 22,
          }}
        >
          {prod.name}
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={prod.imageUrls[0]}
            alt=""
            width={250}
            height={250}
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 16,
              }}
            >
              Price: Rs {prod.price}
            </div>
            {/* {this.state.item.popular && (
              <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                (Popular product)
              </div>
            )} */}

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
              style={{ width: 170, marginTop: 5 }}
              color="primary"
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
              Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>
          </div>
        </div>

        {/* Product description */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 22,
          }}
        >
          Product Description
        </div>
        <div
          style={{
            maxHeight: 200,
            fontSize: 13,
            overflow: "auto",
          }}
        >
          {prod.description ? prod.description : "Not available"}
        </div>
      </div>
    ));
  }
}

let ProductDetail = withRouter(
  connect(mapStateToProps)(ProductDetailComponent)
);
export default ProductDetail;
