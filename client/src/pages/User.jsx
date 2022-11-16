import {
  ErrorOutlineOutlined,
  OpenInNewOutlined,
  PersonAddOutlined,
  ShieldOutlined,
  VerifiedUser,
} from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../api";
import { Header } from "../components";

function User() {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getAll();
        setUserList(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const tableHeader = [
    {
      field: "idNumber",
      headerName: "ID card",
      width: 170,
      renderCell: (params) => (
        <Button variant="text" component={Link} to={`/user/${params.row.id}`}>
          {params.value}
        </Button>
      ),
    },
    { field: "fullName", headerName: "FullName", width: 220 },
    { field: "phoneNumber", headerName: "Phone", width: 170 },
    {
      field: "vaccine",
      headerName: "Vaccinated",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          color={
            params.value.length > 1
              ? "green"
              : params.value.length === 1
              ? "orange"
              : "red"
          }
        >
          {params.value.length > 1 && <VerifiedUser />}
          {params.value.length === 1 && <ShieldOutlined />}
          {params.value.length < 1 && <ErrorOutlineOutlined />}

          <Typography
            variant="body2"
            sx={{ marginLeft: "10px", fontWeight: "500" }}
          >
            Vaccinated width {params.value.length} dove
            {params.value.length > 1 && "s"}
          </Typography>
        </Box>
      ),
    },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <Button
          variant="text"
          component={Link}
          to={`/user/${params.value}`}
          startIcon={<OpenInNewOutlined />}
        >
          Detail
        </Button>
      ),
    },
  ];
  return (
    <>
      <Header
        title="User list"
        rightContent={
          <Button
            variant="contained"
            component={Link}
            to={"/user/create"}
            startIcon={<PersonAddOutlined />}
          >
            Create
          </Button>
        }
      />

      <Paper elevation={0}>
        <DataGrid
          autoHeight
          rows={userList}
          columns={tableHeader}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          density="comfortable"
          showColumnRightBorder
          showCellRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
}

export default User;
