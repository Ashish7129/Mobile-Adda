import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../redux";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginButton from "./LoginStyles";

class ConnectedLogin extends Component {
  state = {
    userName: "",
    pass: "",
    redirectToReferrer: false,
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (null != localStorage.getItem("authUser")) {
      return <Redirect to={from} />;
    }
    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 350,
            width: 300,
            padding: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "#fe757c33",
          }}
        >
          <LockOutlinedIcon
            style={{ marginBottom: 20, fontSize: 80, color: "#FE6B8B" }}
          />

          <TextField
            id="username"
            label="Username"
            variant="outlined"
            style={{
              marginTop: 20,
              width: 250,
            }}
            value={this.state.userName}
            onChange={(e) => {
              this.setState({ userName: e.target.value });
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={this.state.pass}
            style={{
              marginTop: 20,
              width: 250,
            }}
            type="password"
            onChange={(e) => {
              this.setState({ pass: e.target.value });
            }}
          />
          <LoginButton
            style={{
              marginTop: 20,
            }}
            onClick={() => {
              // Simulate authentication call
              Auth.authenticate(
                this.state.userName,
                this.state.pass,
                (user) => {
                  if (!user) {
                    this.setState({ wrongCred: true });
                    return;
                  }

                  this.props.dispatch(setLoggedInUser({ name: user.name }));
                  this.setState(() => ({
                    redirectToReferrer: true,
                  }));
                }
              );
            }}
          >
            Log in
          </LoginButton>
          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong username and/or password</div>
          )}
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
