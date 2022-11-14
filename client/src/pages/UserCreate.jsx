import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomDialog, Header } from "../components";
import addressList from "../assets/province.json";
import { userApi } from "../api";

function UserCreate() {
  const navigate = useNavigate();
  const [onSubmit, setOnSubmit] = useState(false);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState(false);
  const [idCard, setIdCard] = useState("");
  const [idCardErr, setIdCardErr] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogText, setDialogText] = useState("");

  const createUser = async () => {
    if (onSubmit) return;

    const err = [!phone, !name, !address, !idCard];

    setIdCardErr(!idCard);
    setPhoneErr(!phone);
    setNameErr(!name);
    setAddressErr(!address);

    if (!err.every((e) => !e)) return;

    setOnSubmit(true);

    const params = {
      phoneNumber: phone,
      fullName: name,
      address: address.name,
      idNumber: idCard,
    };

    try {
      const res = await userApi.create(params);
      setOnSubmit(false);
      navigate(`/user/${res.user.id}`);
    } catch (error) {
      console.log(error);
      setOnSubmit(false);
      setDialogText(error.message);
      setDialogType("error");
      setDialogOpen(true);
      console.log(error.response);
    }
  };
  return (
    <>
      <Box width="40%">
        <Header
          title="Create user"
          rightContent={
            <Stack direction="row" spacing={2}>
              <Button variant="text" onClick={() => navigate("/user")}>
                Cancel
              </Button>

              <LoadingButton
                variant="contained"
                onClick={createUser}
                loading={onSubmit}
              >
                Create
              </LoadingButton>
            </Stack>
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CardContent>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Id card"
                    variant="outlined"
                    value={idCard}
                    error={idCardErr}
                    onChange={(e) => setIdCard(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Fullname"
                    variant="outlined"
                    value={name}
                    error={nameErr}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Phone"
                    variant="outlined"
                    type="number"
                    error={phoneErr}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    options={addressList.data}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box {...props} component="li">
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Address"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                        }}
                        error={addressErr}
                        value={address}
                      />
                    )}
                    onChange={(e, newValue) => setAddress(newValue)}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

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

export default UserCreate;
