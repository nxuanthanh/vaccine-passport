import {
  DashboardOutlined,
  HealthAndSafetyOutlined,
  PersonOutlineOutlined,
  PlaceOutlined,
  QrCodeScannerOutlined,
} from "@mui/icons-material";
import {
  colors,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const sidebarItems = [
  { text: "Dashboard", path: "/", icon: <DashboardOutlined /> },
  { text: "User", path: "/user", icon: <PersonOutlineOutlined /> },
  { text: "Place", path: "/place", icon: <PlaceOutlined /> },
  { text: "Vaccine", path: "/vaccine", icon: <HealthAndSafetyOutlined /> },
  { text: "QR Scan", path: "/qr-scan", icon: <QrCodeScannerOutlined /> },
];

function Sidebar() {
  const location = useLocation();
  const sidebarWidth = 300;
  const [activeIndex, setactiveIndex] = useState(0);

  useEffect(() => {
    const activeItem = sidebarItems.findIndex(
      (item) =>
        window.location.pathname.split("/")[1] === item.path.split("/")[1]
    );
    setactiveIndex(activeItem);
  }, [location]);
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      sx={{
        width: sidebarWidth,
        height: "100vh",
        boxShadow: "0px 1px 4px 1px rgb(0 0 0 / 12%)",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: 0,
        },
      }}
      open={true}
    >
      <Toolbar />
      <List>
        {sidebarItems.map((item, idx) => (
          <ListItemButton
            key={idx}
            selected={idx === activeIndex}
            component={Link}
            to={item.path}
            sx={{
              width: "calc(100% - 20px)",
              margin: "5px auto",
              borderRadius: "10px",
              "&.Mui-selected": {
                color: colors.blue["A700"],
              },
              "&.Mui-selected:hover": {
                backgroundColor: colors.blue["200"],
              },
            }}
          >
            <ListItemIcon
              sx={{ color: idx === activeIndex && colors.blue["A700"] }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& span": {
                  fontWeight: idx === activeIndex && "500",
                },
              }}
            ></ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
