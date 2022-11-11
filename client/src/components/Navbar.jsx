import { CoronavirusOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  colors,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../handlers/authHandler";
import avatarImg from "../assets/images/avatar.png";

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: colors.common.white,
        color: colors.common.black,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "0px 1px 4px 1px rgb(0 0 0 / 12%)",
      }}
      elevation={0}
    >
      <Toolbar>
        <CoronavirusOutlined
          sx={{ color: colors.red["800"], marginRight: "10px" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textTransform: "uppercase" }}
        >
          vaccine passport
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt="profile image"
            src={avatarImg}
            sx={{ height: "30px", width: "30px" }}
          />
          <IconButton
            aria-label="logout"
            sx={{ color: colors.blue["800"] }}
            onClick={() => logout(navigate)}
          >
            <ExitToAppOutlined />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
