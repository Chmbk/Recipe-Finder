import React from "react";
import Dialog from "@material-ui/core/Dialog";

const CustomDialog = ({ open, onClose, children }) => {
  return <Dialog open={open} onClose={onClose}>{children}</Dialog>;
};

export default CustomDialog;