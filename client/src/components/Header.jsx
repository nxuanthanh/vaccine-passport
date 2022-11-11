import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

function Header(props) {
  const { title, rightContent } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <Stack>
        <Typography variant="h6">{title}</Typography>
      </Stack>
      {rightContent}
    </Box>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  rightContent: PropTypes.node,
};

export default Header;
