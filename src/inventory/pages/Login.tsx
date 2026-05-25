import { SyntheticEvent, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Container, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material";
import useAxios from "../../hooks/useAxios";


export default function LogIn(props: {
  setToken: (token: string) => void
}) {
  const { setToken } = props;

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    state: false,
    statusCode: "",
    message: "",
  });
  const navigate = useNavigate();
  const axios = useAxios();

  const submitForm = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    axios
      .post("/login", data)
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        sessionStorage.setItem("jwt", token);
        navigate("/");
      })
      .catch((err) => {
        setError({ state: true, ...err.response.data });
      });
  };

  const handleClose = (_event: Event | SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ ...error, state: false });
  };
  return (
    <Container component="main" maxWidth="xs">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={error.state}
          onClose={handleClose}
          message={error.message}
          autoHideDuration={6000}
        />
        <form noValidate onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={(ev) => setData({ ...data, email: ev.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(ev) => setData({ ...data, password: ev.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Sign In
          </Button>
        </form>
   
    </Container>
  );
}
