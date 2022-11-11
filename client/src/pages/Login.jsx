import { LoadingButton } from "@mui/lab";
import { Box, Card, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import bgImage from "../assets/images/login-bg.png";
import { isAuthenticated } from "../handlers/authHandler";

function Login() {
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await isAuthenticated();
      if (res) return navigate("/");
    })();
  }, []);

  const handleOnLoginSunmit = async () => {
    if (onSubmit) return;
    setLoginErr(undefined);

    const checkErr = {
      username: username.trim().length === 0,
      password: password.trim().length === 0,
    };

    setUsernameErr(checkErr.username);
    setPasswordErr(checkErr.password);

    if (checkErr.username || checkErr.password) return;

    const params = {
      username,
      password,
    };

    setOnSubmit(true);

    try {
      const res = await authApi.login(params);

      localStorage.setItem("token", res.token);
      setOnSubmit(false);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        setLoginErr(error.response.data);
      }
      console.log(error.response.data);
      setOnSubmit(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: "600px" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            maxWidth: "400px",
            "& .MuiTextField-root": { mb: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            margin: "auto",
            padding: "5rem 1rem",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            mb="4rem"
            fontWeight="700"
            textTransform="uppercase"
          >
            vaccine passport
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="User name"
              variant="outlined"
              value={username}
              error={usernameErr}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              error={passwordErr}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {loginErr && (
            <FormControl>
              <Typography color="error">{loginErr}</Typography>
            </FormControl>
          )}

          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            sx={{ marginTop: "1rem" }}
            onClick={handleOnLoginSunmit}
          >
            Sign in
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;
