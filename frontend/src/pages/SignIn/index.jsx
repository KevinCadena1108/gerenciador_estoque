import { useContext, useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app");
    }
  });

  const onSubmit = async ({ email, senha }) => {
    try {
      await signIn({ email, senha });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: { xs: 4, sm: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          my={4}
          variant="h2"
          fontWeight="bold"
          textAlign="center"
          fontFamily="'Abril Fatface', serif"
        >
          Aroma Perfetto Cafè
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && (
          <Alert sx={{ m: 2, width: "100%" }} severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.response.data.message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, px: 4 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            variant="standard"
            autoComplete="email"
            autoFocus
            {...register("email", { required: "Esse campo é obrigatório" })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            variant="standard"
            type="password"
            autoComplete="current-password"
            {...register("senha", {
              required: "Esse campo é obrigatório",
              minLength: 4,
            })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Logar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
