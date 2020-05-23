import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { loggedInUser: state.user.loggedInUser };
};

const AuthGuardCheckout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return rest.loggedInUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

const AuthGuard = connect(mapStateToProps)(AuthGuardCheckout);
export default AuthGuard;
