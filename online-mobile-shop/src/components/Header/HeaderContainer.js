import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu, logout } from "../../redux";
import Auth from "../../Utils/Auth";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LockIcon from "@material-ui/icons/Lock";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import InputAdornment from "@material-ui/core/InputAdornment";

const mapStateToProps = (state) => {
  return {
    nrOfItemsInCard: state.cart.cartItems.length,
    loggedInUser:
      state.user.loggedInUser != null ||
      localStorage.getItem("authUser") != null,
  };
};

// Option items for product categories.
// const categoryOptions = categories.map((x) => {
//   return (
//     <MenuItem key={x.name} value={x.name}>
//       {x.name}
//     </MenuItem>
//   );
// });

class HeaderContainer extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    //categoryFilterValue: categories[0].name,
    isLogged: localStorage.getItem("authUser") != null,
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
            <IconButton
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              <HomeIcon style={{ fontSize: 40, color: "#c1062f" }} />
            </IconButton>
            {/* <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton> */}

            {/* <img src={cartImage} alt={"Logo"} style={{ marginLeft: 10 }} /> */}
            {/* <TextField
              id="outlined-basic"
              variant="outlined"
              label="Search mobiles"
              value={this.state.searchTerm}
              onChange={(e) => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      style={{ marginLeft: 20 }}
                      onClick={() => {
                        this.props.history.push(
                          "/?term=" + this.state.searchTerm
                        );
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}

            {/* <Select
              style={{ maxWidth: 200, marginLeft: 20 }}
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500,
                },
              }}
              onChange={(e) => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >
              {categoryOptions}
            </Select> */}

            {/* <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push("/?term=" + this.state.searchTerm);
              }}
            >
              <SearchIcon />
            </Button> */}
          </div>
          <div className="right-part">
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
                      }}
                    >
                      <SearchIcon style={{ fontSize: 25, color: "#c1062f" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!this.props.loggedInUser || !this.state.isLogged ? (
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
