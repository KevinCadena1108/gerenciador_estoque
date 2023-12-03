import { useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";

import Form from "../../components/Form";

const CadEs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        title="Cadastrar Estoque"
        back="/app/estoque"
      >
        <Grid item xs={12}>
          <Typography variant="h6"> Dados do Produto </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            variant="standard"
            fullWidth
            error={Boolean(errors?.tipo)}
            {...register("tipo", { required: "Esse campo é obrigatório" })}
          >
            <InputLabel id="select-input-label">Tipo</InputLabel>
            <Select
              defaultValue="TRADICIONAL"
              id="select-input-label"
              label="Tipo"
            >
              <MenuItem value="TRADICIONAL">Tradicional</MenuItem>
              <MenuItem value="ESPRESSO">Espresso</MenuItem>
              <MenuItem value="ESPECIAL">Especial</MenuItem>
              <MenuItem value="BLEND">Blend</MenuItem>
            </Select>
            {errors?.tipo && (
              <FormHelperText> {errors?.tipo?.message} </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid mb={4} item xs={12} md={6}>
          <TextField
            variant="standard"
            label="Quantidade"
            fullWidth
            error={Boolean(errors?.quantidade)}
            helperText={errors?.quantidade?.message}
            {...register("quantidade", {
              required: "Esse campo é obrigatório",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">KG</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid mb={4} item xs={12} md={6}>
          <TextField
            variant="standard"
            label="Valor"
            fullWidth
            error={Boolean(errors?.valor)}
            helperText={errors?.valor?.message}
            {...register("valor", { required: "Esse campo é obrigatório" })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid mb={4} item xs={12} md={6}>
          <TextField
            variant="standard"
            label="Descrição"
            fullWidth
            error={Boolean(errors?.descricao)}
            helperText={errors?.descricao?.message}
            {...register("descricao", { required: "Esse campo é obrigatório" })}
          />
        </Grid>
      </Form>
    </>
  );
};

export default CadEs;
