import React from "react";
import Left from "@material-ui/icons/ChevronLeft";
import Right from "@material-ui/icons/ChevronRight";
import First from "@material-ui/icons/FirstPage";
import Last from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const Pagination = (props) => {
  let { parsedQS } = props;
  let productsPerPage = parseInt(parsedQS.productsPerPage) || 4;
  let page = parseInt(parsedQS.page) || 1;
  let totalPages = Math.ceil(props.totalProducts / productsPerPage);

  if (!props.totalProducts) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#676563",
      }}
    >
      <IconButton
        disabled={page === 1}
        onClick={() => {
          props.updateQueryString({ page: 1 });
        }}
        style={{ marginRight: 10, fontSize: 30 }}
      >
        <First />
      </IconButton>
      <IconButton
        disabled={page === 1}
        onClick={() => {
          props.updateQueryString({ page: page - 1 });
        }}
        style={{ marginRight: 10, fontSize: 30 }}
      >
        <Left />
      </IconButton>
      <Typography variant="body1">
        Page {page} of {totalPages}
      </Typography>
      <IconButton
        disabled={page >= totalPages}
        onClick={() => {
          props.updateQueryString({ page: page + 1 });
        }}
        style={{ marginLeft: 10, marginRight: 10, fontSize: 30 }}
      >
        <Right />
      </IconButton>
      <IconButton
        disabled={page >= totalPages}
        onClick={() => {
          props.updateQueryString({ page: totalPages });
        }}
        style={{ marginRight: 10, fontSize: 30 }}
      >
        <Last />
      </IconButton>
    </div>
  );
};

export default withRouter(Pagination);
