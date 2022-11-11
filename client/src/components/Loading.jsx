import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
