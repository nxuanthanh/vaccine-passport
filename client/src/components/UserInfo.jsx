import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import addressList from "../assets/province.json";

function UserInfo({ user }) {
  const [name, setName] = useState(user.fullName);
  const [nameErr, setNameErr] = useState(false);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [phoneErr, setPhoneErr] = useState(false);
  const [address, setAddress] = useState(
    addressList.data.find((e) => e.name === user.address) || undefined
  );
  const [addressErr, setAddressErr] = useState(false);
  const [idCard, setIdCard] = useState(user.idNumber);
  const [idCardErr, setIdCardErr] = useState(false);

  const [onUpdate, setOnUpdate] = useState(false);

  const handleOnUpdateUser = async () => {
    if (onUpdate) return;

    const err = [!phone, !name, !address, !idCard];

    setIdCardErr(!idCard);
    setPhoneErr(!phone);
    setNameErr(!name);
    setAddressErr(!address);

    if (!err.every((e) => !e)) return;

    setOnUpdate(true);

    const params = {
      phoneNumber: phone,
      fullName: name,
      address: address.name,
      idNumber: idCard,
    };

    try {
      await userApi.update(user.id, params);

      setOnUpdate(false);
      onUpdateSuccess();
    } catch (error) {
      setOnUpdate(false);
      console.log(error.response);
      onUpdateFalse(error.response.data);
    }
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Id card"
                variant="outlined"
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                error={idCardErr}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Fullname"
                variant="outlined"
                value={name}
                error={nameErr}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
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
          </Grid>

          <Grid item xs={6}>
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
                  />
                )}
                value={address}
                onChange={(e, newValue) => setAddress(newValue)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <LoadingButton
          variant="contained"
          disableElevation
          onClick={handleOnUpdateUser}
          loading={onUpdate}
        >
          Update
        </LoadingButton>
      </CardActions>
    </Card>
  );
}

export default UserInfo;
