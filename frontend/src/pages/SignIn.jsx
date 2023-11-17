import { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

export default function SignIn() {
  const { user, signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email, password }) => {
    signIn({ email, password });

    console.log(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            {...register("email", { required: "Esse campo é obrigatório" })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            autoComplete="current-password"
            {...register("password", {
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
          <Grid container>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Não tem uma conta? Criar..."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
