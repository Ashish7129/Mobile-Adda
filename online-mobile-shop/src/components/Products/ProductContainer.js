import React, { useEffect, Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchProductsFailure, fetchProductsSuccess } from "../../redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProductHeader from "./ProductHeader";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      totalProducts: null,
    };
    this.updateQueryString = this.updateQueryString.bind(this);
  }

  updateQueryString(newValues) {
    let currentQS = queryString.parse(this.props.location.search);
    let newQS = { ...currentQS, ...newValues };
    this.props.history.push("/?" + queryString.stringify(newQS));
  }

  async fetchData() {
    await axios
      .get(
        "https://my-json-server.typicode.com/Ashish7129/online-mobile-store/products"
      )
      .then((response) => {
        // response.data is the products
        this.state.products = response.data;
        this.props.dispatch(fetchProductsSuccess(this.state.products));
      })
      .catch((error) => {
        // error.message is the error message
        this.props.dispatch(fetchProductsFailure(error.message));
      });
    this.setState({
      products: this.props.productData.products,
      loading: this.props.productData.loading,
      totalProducts: this.props.productData.products.length,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let { termToSearch, resultData, totalProductsCount } = this.SearchAndSort();
    console.log(resultData);
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    if (this.state.error) {
      return <h2>{this.state.error}</h2>;
    }
    if (resultData.length == 0) {
      return <h2>Not Products Found</h2>;
    }
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ProductHeader
          updateQueryString={this.updateQueryString}
          totalProducts={resultData.length}
          parsedQS={termToSearch}
        />

        <div style={{ marginTop: 100, marginBottom: 100 }}>
          {resultData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          updateQueryString={this.updateQueryString}
          totalProducts={totalProductsCount}
          parsedQS={termToSearch}
        />
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search);

    let areSameObjects = (a, b) => {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (let key in a) {
        if (a[key] !== b[key]) return false;
      }
      return true;
    };
    if (!areSameObjects(currentQS, oldQS)) {
      this.SearchAndSort();
    }
  }

  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;
    //console.log("sort" + data);
    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }
    //console.log("aftersort" + data);
    return items;
  }

  SearchAndSort() {
    let termToSearch = queryString.parse(window.location.search);
    //console.log(termToSearch);
    termToSearch.page = termToSearch.page || 1;
    termToSearch.sortValue = termToSearch.sortValue || "lh";
    termToSearch.productsPerPage = termToSearch.productsPerPage || 8;
    let resultData = this.props.productData.products;
    let totalProductsCount;
    //console.log(this.state.totalProducts);
    //console.log(termToSearch);
    if (termToSearch) {
      if (termToSearch.term) {
        resultData = this.state.products.filter((product) => {
          if (
            !product.name
              .toLowerCase()
              .includes(termToSearch.term.toLowerCase())
          )
            return false;
          return true;
        });
      }

      resultData = this.sortByPrice(resultData, termToSearch.sortValue);
      totalProductsCount = resultData.length;
      //console.log("After Sort :" + resultData);
      if (termToSearch.page) {
        resultData = resultData.slice(
          (termToSearch.page - 1) * termToSearch.productsPerPage,
          termToSearch.page * termToSearch.productsPerPage
        );
      }
      //console.log("Insearch after all computations :" + resultData);
    }
    //console.log("Aftersearch :" + resultData);
    return { termToSearch, resultData, totalProductsCount };
  }
}
const mapStateToProps = (state) => {
  return {
    productData: state.products,
  };
};

export default withRouter(connect(mapStateToProps)(ProductContainer));
