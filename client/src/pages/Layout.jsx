import { Box, colors, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading, Navbar, Sidebar } from "../components";
import { isAuthenticated } from "../handlers/authHandler";

function Layout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await isAuthenticated();
      if (!res) return navigate("/login");
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Loading />
    </Box>
  ) : (
    <Box>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: colors.grey["100"],
            width: "max-content",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
