import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProductInCart, showCartDlg } from "../../redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

class ProductCard extends Component {
  render() {
    return (
      <Card
        style={{
          width: 500,
          marginLeft: 23,
          marginBottom: 10,
          display: "inline-block",
        }}
      >
        <CardActionArea
          style={{ display: "flex", height: 200 }}
          onClick={() => {
            this.props.history.push("/product/" + this.props.product.id);
          }}
        >
          <div className="card-image">
            <img
              src={this.props.product.imageUrls[0]}
              alt={this.props.product.name}
            />
          </div>
          <CardContent style={{ height: 90 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                fontSize: 21,
                whiteSpace: "wrap",
                width: 200,
              }}
            >
              {this.props.product.name}
            </div>
            <Rating
              name="read-only"
              value={this.props.product.rating}
              readOnly
            />
            <div style={{ margin: 5, fontSize: 30, color: "red" }}>
              {"Rs. "}
              {this.props.product.price}{" "}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 70 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            style={{
              marginRight: 30,
              marginLeft: 60,
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
              fontWeight: 200,
            }}
            onClick={() => {
              this.props.history.push("/product/" + this.props.product.id);
            }}
          >
            <ViewHeadlineIcon
              color="secondary"
              style={{ marginRight: 5, color: "white" }}
            />{" "}
            VIEW DETAIL
          </Button>
          <Tooltip title="Add to cart">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              style={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
                fontWeight: 200,
              }}
              onClick={(e) => {
                e.stopPropagation();
                this.props.dispatch(
                  addProductInCart({ ...this.props.product, quantity: 1 })
                );
                this.props.dispatch(showCartDlg(true));
              }}
              aria-label="Add to shopping cart"
            >
              <ShoppingCartIcon
                color="secondary"
                style={{ marginRight: 5, color: "white" }}
              />
              ADD TO CART
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(ProductCard));
