import { useState } from "react";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CadUsu = () => {
  return (
    <>
      <Grid container my={3} direction="row" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link href="/app/usuario">
            <ArrowBackIcon fontSize="large" />
          </Link>
        </Grid>

        <Grid item sm={3} xs={2}></Grid>

        <Grid item xs={2}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Cadastrar Usuarios
          </Typography>
        </Grid>
      </Grid>

      <MyForm />
    </>
  );
};

function MyForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contato: "",
    cargo: "",
    senha: "",
    tipo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} m={2}>
        <Grid item xs={7}>
          <TextField
            label="Nome"
            variant="outlined"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Contato"
            variant="outlined"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Cargo"
            variant="outlined"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Senha"
            variant="outlined"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="tipo">Tipo do usuário</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Tipo"
              variant="standard"
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Usuário">Usuário</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ margin: "20px", marginLeft: "35px" }}
      >
        Cadastrar
      </Button>
    </form>
  );
}

export default CadUsu;
