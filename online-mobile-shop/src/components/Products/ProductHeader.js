import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";

class ProductsHeader extends Component {
  render() {
    let { parsedQS, updateQueryString, totalProducts } = this.props;
    let sortValue = parsedQS.sortValue || "lh";
    let keyword = parsedQS.term;

    let subtitle = (
      <React.Fragment>
        <span style={{ fontSize: 20, color: "gray", marginTop: 5 }}>
          {"Showing " +
            totalProducts +
            " product" +
            (totalProducts === 1 ? " " : "s ") +
            (keyword ? "for " : "")}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "gray",
              marginTop: 5,
            }}
          >
            {keyword}
          </span>
        )}
      </React.Fragment>
    );

    return (
      <div>
        <div
          style={{
            padding: 10,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fe875e61",
          }}
        >
          <div style={{ flex: 1 }}>{subtitle}</div>
          <span
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 13,
              color: "#696764",
            }}
          >
            SORT BY{" "}
          </span>
          <Select
            value={sortValue}
            onChange={(e) => {
              updateQueryString({ sortValue: e.target.value });
            }}
          >
            {" "}
            <MenuItem value={"lh"}> Low to High Price</MenuItem>
            <MenuItem value={"hl"}> High to Low Price</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductsHeader);
