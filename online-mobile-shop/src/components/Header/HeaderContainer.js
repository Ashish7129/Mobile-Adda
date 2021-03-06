import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, logout, setCheckedOutItems } from "../../redux";
import Auth from "../../Utils/Auth";
import Person from "@material-ui/icons/PersonOutline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LockIcon from "@material-ui/icons/Lock";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import InputAdornment from "@material-ui/core/InputAdornment";

const mapStateToProps = (state) => {
  return {
    nrOfItemsInCard: state.cart.cartItems.length,
    loggedInUser: state.user.loggedInUser,
    items: state.cart.cartItems,
  };
};

class HeaderContainer extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    isLogged: localStorage.getItem("authUser"),
  };

  render() {
    let { anchorEl } = this.state;

    return (
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          padding: 10,
        }}
      >
        <Toolbar>
          <div className="left-part">
            <a href="/" className="logo"></a>
          </div>
          <div className="right-part">
            <IconButton
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              <HomeIcon style={{ fontSize: 40, color: "#c1062f" }} />
            </IconButton>
            <TextField
              label="Search Mobiles"
              value={this.state.searchTerm}
              onChange={(e) => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{
                marginLeft: 30,
                width: 350,
                fontSize: 20,
                marginBottom: 15,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      style={{ marginLeft: 20, borderColor: "#c1062f" }}
                      onClick={() => {
                        this.props.history.push(
                          "/?term=" + this.state.searchTerm
                        );
                        this.setState({ searchTerm: "" });
                      }}
                    >
                      <SearchIcon style={{ fontSize: 25, color: "#c1062f" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!this.props.loggedInUser ? (
              <IconButton
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                <LockIcon style={{ fontSize: 40, color: "#c1062f" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={(event) => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
              >
                <Person style={{ fontSize: 40, color: "#c1062f" }} />
              </IconButton>
            )}

            <IconButton
              aria-label="Cart"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge
                badgeContent={this.props.nrOfItemsInCard}
                color="secondary"
                showZero
              >
                <ShoppingCartIcon style={{ fontSize: 40, color: "#c1062f" }} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.dispatch(setCheckedOutItems(this.props.items));
                  this.props.history.push("/order");
                }}
              >
                Checkout page
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signout(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(HeaderContainer));
export default Header;
