import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      <h2>Products List</h2>
      <div>
        {productData &&
          productData.products &&
          productData.products.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-image">
                <img src={item.imageUrls[0]} alt={item.name} />
                <span className="card-title">{item.name}</span>
                <span
                  to="/"
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={() => {
                    this.handleClick(item.id);
                  }}
                >
                  <i className="material-icons">add</i>
                </span>
              </div>

              <div className="card-content">
                <p>{item.description}</p>
                <p>
                  <b>Price: {item.price}$</b>
                </p>
              </div>
            </div>
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
