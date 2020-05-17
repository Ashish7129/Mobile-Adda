import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import ProductCard from "./ProductCard";

function ProductContainer({ productData, fetchProducts }) {
  useEffect(() => {
    fetchProducts();
  }, []);
  return productData.loading ? (
    <CircularProgress className="circular" />
  ) : productData.error ? (
    <h2>{productData.error}</h2>
  ) : (
    <div>
      <div>
        {productData &&
          productData.products &&
          productData.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
