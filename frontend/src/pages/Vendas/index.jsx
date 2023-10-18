import { useState } from "react";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Vendas = () => {
  return (
    <>
      <Grid container my={3} direction="row" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {" "}
          <Link href="/">
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
            Vendas{" "}
          </Typography>{" "}
        </Grid>
      </Grid>

      <MyForm />
    </>
  );
};

function MyForm() {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    quantidade: "",
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
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="tipo">Tipo</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value="Tradicional">Tradicional</MenuItem>
              <MenuItem value="Especial">Especial</MenuItem>
              <MenuItem value="Espresso">Espresso</MenuItem>
              <MenuItem value="Blend">Blend</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={7}>
          <TextField
            label="Preço"
            variant="outlined"
            name="preço"
            value={formData.preço}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Quantidade"
            variant="outlined"
            name="quantidade"
            value={formData.quantidade}
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
