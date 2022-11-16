import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { vaccineApi } from "../api";
import { Header, VaccineCreateModal } from "../components";

function Vaccine() {
  const [vaccineList, setVaccineList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tableHeader = [
    {
      field: "name",
      headerName: "Name",
      width: 400,
      renderCell: (params) => (
        <Button
          variant="text"
          component={Link}
          to={`/vaccine/${params.row.id}`}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      align: "right",
      width: 170,
      renderCell: (params) => params.value?.toLocaleString("de-DE"),
    },
    {
      field: "vaccinated",
      headerName: "Vaccinated",
      align: "right",
      width: 170,
      renderCell: (params) => params.value?.toLocaleString("de-DE"),
    },
    {
      field: "id",
      headerName: "Available",
      align: "right",
      width: 170,
      renderCell: (params) =>
        (params.row.quantity - params.row.vaccinated).toLocaleString("de-DE"),
    },
    {
      field: "vaccineLots",
      headerName: "Lots",
      width: 170,
      renderCell: (params) => params.value?.length,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];
  const onCreateSuccess = (newVaccine) => {
    setVaccineList([newVaccine, ...vaccineList]);
    setShowCreateModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await vaccineApi.getAll();
        setVaccineList(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Header
        title="Vaccine list"
        rightContent={
          <Button
            variant="contained"
            disableElevation
            onClick={() => setShowCreateModal(true)}
          >
            Create
          </Button>
        }
      />
      <Paper elevation={0}>
        <DataGrid
          autoHeight
          rows={vaccineList}
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
      <VaccineCreateModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={onCreateSuccess}
      />
    </>
  );
}

export default Vaccine;
