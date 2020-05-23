import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";

class ProductsHeader extends Component {
  render() {
    let { parsedQS, updateQueryString, totalProducts } = this.props;
    let sortValue = parsedQS.sortValue || "lh";
    let keyword = parsedQS.term;
    
    let subtitle = (
      <React.Fragment>
        <span style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
          {totalProducts +
            " result" +
            (totalProducts === 1 ? " " : "s ") +
            (keyword ? "for " : "")}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: "bold",
              fontSize: 12,
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
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 }}>{subtitle}</div>

          <Select
            value={sortValue}
            onChange={(e) => {
              updateQueryString({ sortValue: e.target.value });
            }}
          >
            <MenuItem value={"lh"}>Sort by price: low to high</MenuItem>
            <MenuItem value={"hl"}>Sort by price: high to low</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductsHeader);
