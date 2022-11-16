import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { userApi } from "../api";
import { Header, UserVaccinated } from "../components";

function QRScan() {
  const [onLoadUser, setOnLoadUser] = useState(false);
  const [user, setUser] = useState();

  const handleErr = (err) => {
    console.log(err);
  };

  const handleScan = async (data) => {
    if (onLoadUser) return;
    if (!data) return;
    try {
      setOnLoadUser(true);
      const res = await userApi.getOne(data);
      setUser(res);
    } catch (err) {
      console.log(err);
    } finally {
      setOnLoadUser(false);
    }
  };

  return (
    <>
      <Header title="Scan user QR" />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Card elevation={0}>
            <CardContent>
              <QrReader
                delay={1000}
                onError={handleErr}
                onScan={handleScan}
                style={{ width: "100%" }}
                facingMode="user"
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setUser(null)}
              >
                Reset
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={4}>
            <Card elevation={0}>
              <CardHeader
                title={<Typography variant="h6">User info</Typography>}
              />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl>
                      {user && (
                        <TextField
                          label="Id card"
                          variant="outlined"
                          value={user.idNumber}
                          InputProps={{ readOnly: true }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      {user && (
                        <TextField
                          label="Fullname"
                          variant="outlined"
                          value={user.fullName}
                          InputProps={{ readOnly: true }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      {user && (
                        <TextField
                          label="Phone"
                          variant="outlined"
                          value={user.phoneNumber}
                          InputProps={{ readOnly: true }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      {user && (
                        <TextField
                          label="Address"
                          variant="outlined"
                          value={user.address}
                          InputProps={{ readOnly: true }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card elevation={0}>
              <CardHeader
                title={
                  <Typography variant="h6">Vaccinated information</Typography>
                }
              />
              <CardContent>
                {user && <UserVaccinated vaccinatedList={user.vaccinated} />}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default QRScan;
