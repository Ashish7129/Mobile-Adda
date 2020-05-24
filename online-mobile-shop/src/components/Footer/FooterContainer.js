import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Ashish7129">
        Mobile Adda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class FooterContainer extends Component {
  render() {
    return (
      <div
        style={{
          padding: 30,
          backgroundColor: " rgb(236, 186, 161)",
        }}
      >
        <Copyright />
      </div>
    );
  }
}

const Footer = withRouter(connect()(FooterContainer));
export default Footer;
