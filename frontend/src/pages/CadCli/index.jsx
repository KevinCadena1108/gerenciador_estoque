import { useState } from "react";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CadCli = () => {
  return (
    <>
      <Grid container my={3} direction="row" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {" "}
          <Link href="/cliente">
            <ArrowBackIcon fontSize="large" />{" "}
          </Link>
        </Grid>

        <Grid item sm={3} xs={2}>
          {" "}
        </Grid>

        <Grid item xs={2}>
          {" "}
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {" "}
            Cadastro{" "}
          </Typography>{" "}
        </Grid>
      </Grid>

      {}
      <MyForm />
    </>
  );
};

function MyForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contato: "",
    cnpj: "",
    cidade: "",
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
            label="CNPJ"
            variant="outlined"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Cidade"
            variant="outlined"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            fullWidth
          />
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
