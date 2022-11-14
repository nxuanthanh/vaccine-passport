import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CheckCircleOutlined, ErrorOutlineOutlined } from "@mui/icons-material";

function CustomDialog(props) {
  const { title, showIcon, content, type, actions, open } = props;

  return (
    <Dialog open={open} PaperProps={{ style: { padding: "15px" } }}>
      <DialogTitle>
        {title}
        {showIcon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {type === "success" && (
              <CheckCircleOutlined
                color="success"
                sx={{ fontSize: "3.5rem" }}
              />
            )}
            {type === "error" && (
              <ErrorOutlineOutlined color="error" sx={{ fontSize: "3.5rem" }} />
            )}
          </Box>
        )}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.node,
  open: PropTypes.bool,
  showIcon: PropTypes.bool,
  type: PropTypes.string,
};

export default CustomDialog;
