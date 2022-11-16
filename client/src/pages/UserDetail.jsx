import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { userApi } from "../api";
import { CustomDialog, Header, UserInfo, UserVaccine } from "../components";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogText, setDialogText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getOne(id);

        setUser(res);
      } catch (error) {
        console.log(err);
      }
    })();
  }, []);

  const onUpdateSuccess = () => {
    console.log("onUpdateSuccess");
    setDialogType("success");
    setDialogText("User updated");
    setDialogOpen(true);
  };

  const onUpdateFalse = (message) => {
    console.log("onUpdateFalse");
    setDialogType("error");
    setDialogText(message || "User update fail");
    setDialogOpen(true);
  };
  return (
    <>
      <Header title="User detail" />
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Stack spacing={4}>
            {user && (
              <UserInfo
                user={user}
                onUpdateFalse={onUpdateFalse}
                onUpdateSuccess={onUpdateSuccess}
              />
            )}
            {user && <UserVaccine user={user} />}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user && (
                  <QRCode id="qrcode" value={user._id} size={235} level="H" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CustomDialog
        open={dialogOpen}
        type={dialogType}
        showIcon
        content={
          <Typography variant="subtitle1" textAlign="center">
            {dialogText}
          </Typography>
        }
        actions={
          <Box width="100%" sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setDialogOpen(false)}>
              OK
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default UserDetail;
