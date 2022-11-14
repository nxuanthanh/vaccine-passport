import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { placeApi } from "../api";
import { Header } from "../components";

function Place() {
  const [placeList, setPlaceList] = useState([]);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    (async () => {
      try {
        const res = await placeApi.getAll();
        setPlaceList(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const tableHeader = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Button variant="text" component={Link} to={`/place/${params.row.id}`}>
          {params.value}
        </Button>
      ),
    },
    {
      field: "creator",
      headerName: "Created by",
      width: 220,
      renderCell: (params) => (
        <Button
          variant="text"
          component={Link}
          to={`/user/${params.value._id}`}
        >
          {params.value.fullName}
        </Button>
      ),
    },
    {
      field: "userVisitLast24h",
      headerName: "User check in last 24h",
      width: 220,
      align: "right",
      renderCell: (params) => params.value.length,
    },
    { field: "address", headerName: "Address", flex: 1 },
  ];
  return (
    <>
      <Header title="Place list" />
      <Paper elevation={0}>
        <DataGrid
          autoHeight
          rows={placeList}
          columns={tableHeader}
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          rowsPerPageOptions={[9, 50, 100]}
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
}

export default Place;
