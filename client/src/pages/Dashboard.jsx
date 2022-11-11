import {
  AddModeratorOutlined,
  PersonOutlineOutlined,
  RoomOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import adminApi from "../api/adminApi";

function Dashboard() {
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await adminApi.getSummary();
        console.log(res);
        setSummaryData(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Stack spacing={4}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Total user"
                    number={summaryData.totalUser.toLocaleString("de-DE")}
                    icon={
                      <PersonOutlineOutlined
                        sx={{ fontSize: "3rem" }}
                        color="warning"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="User vaccinated"
                    number={summaryData.userVaccinated.toLocaleString("de-DE")}
                    icon={
                      <VerifiedUserOutlined
                        sx={{ fontSize: "3rem" }}
                        color="success"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Availabe vaccine dose"
                    number={summaryData.availableVaccineDose.toLocaleString(
                      "de-DE"
                    )}
                    icon={
                      <AddModeratorOutlined
                        sx={{ fontSize: "3rem" }}
                        color="primary"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Total places"
                    number={summaryData.totalPlace.toLocaleString("de-DE")}
                    icon={
                      <RoomOutlined sx={{ fontSize: "3rem" }} color="error" />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardHeader
                title={<Typography variant="h6">Vaccinated analyst</Typography>}
                action={
                  <Button
                    variant="text"
                    disableElevation
                    component={Link}
                    to="/vaccine"
                  >
                    Manage vaccine
                  </Button>
                }
              />
              <CardContent>
                {summaryData && (
                  <VaccinatedChart
                    chartData={summaryData.userVaccinatedAnalyst}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={
                  <Typography variant="h6">Latest vaccine lots</Typography>
                }
              />
              <CardContent>
                {summaryData && (
                  <LatestVaccineLotTable list={summaryData.latestVaccineLot} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Dashboard;

const SummaryInfo = ({ title, number, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="body2" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="600">
          {number}
        </Typography>
      </Stack>
      <Box>{icon}</Box>
    </Box>
  );
};

const VaccinatedChart = ({ chartData }) => {
  console.log(chartData);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [
      `1 dose ${Math.floor(
        (chartData?.userWithOneDose / chartData?.totalUser) * 100
      )}%`,
      `Upper 2 dose ${Math.floor(
        (chartData?.userWithAboveTwoDose / chartData?.totalUser) * 100
      )}%`,
      `0 dose ${Math.floor(
        (chartData?.userWithZeroDose / chartData?.totalUser) * 100
      )}%`,
    ],

    datasets: [
      {
        label: "Vaccinated analyst",
        data: [
          chartData?.userWithOneDose,
          chartData?.userWithAboveTwoDose,
          chartData?.userWithZeroDose,
        ],
        backgroundColor: [
          colors.yellow["700"],
          colors.green["700"],
          colors.red["700"],
        ],
        borderColor: [
          colors.yellow["700"],
          colors.green["700"],
          colors.red["700"],
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: { position: "bottom" },
        },
      }}
    />
  );
};

const LatestVaccineLotTable = ({ list }) => {
  const tableHeader = [
    {
      field: "name",
      headerName: "Lot number",
      width: 200,
    },

    {
      field: "vaccine",
      headerName: "Vaccine",
      width: 200,
      renderCell: (params) => params.value.name,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      align: "right",
      renderCell: (params) => params.value.toLocaleString("de-DE"),
    },

    {
      field: "createdAt",
      headerName: "Time",
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={list}
      columns={tableHeader}
      hideFooter
      density="comfortable"
      showCellRightBorder
      showColumnRightBorder
      dis
    />
  );
};
