import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProductInCart } from "../../redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";

class ProductCard extends Component {
  render() {
    return (
      <Card
        style={{
          width: 400,
          margin: 10,
          display: "inline-block",
        }}
      >
        <CardActionArea
          style={{ display: "flex" }}
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
          {/* <CardMedia
            style={{ height: 400 }}
            image={this.props.product.imageUrls[0]}
          /> */}
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                fontSize: 30,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {this.props.product.name}
            </div>
            <Rating
              name="read-only"
              value={this.props.product.rating}
              readOnly
            />
            <div style={{ margin: 5, fontSize: 30 }}>
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
            style={{ marginRight: 60 }}
            onClick={() => {
              this.props.history.push("/product/" + this.props.product.id);
            }}
          >
            {" "}
            VIEW DETAIL
          </Button>
          <Tooltip title="Add to cart">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                this.props.dispatch(
                  addProductInCart({ ...this.props.product, quantity: 1 })
                );
              }}
              aria-label="Add to shopping cart"
            >
              {" "}
              ADD TO CART
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(ProductCard));
