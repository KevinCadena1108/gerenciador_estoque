import { useState } from "react";
import { Typography, Grid, TextField, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";

import Form from "../../components/Form";
import { createEstoque } from "./requests";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";

const CadEs = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (produto) => {
    const { data, status } = await createEstoque(produto);

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app/estoque");
  };

  return (
    <>
      <AlertMessage alert={alert} setAlert={setAlert} />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        title="Cadastrar Estoque"
        back="/app/estoque"
      >
        <Grid item xs={12}>
          <Typography variant="h6"> Dados do Produto </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="standard"
            label="Nome"
            fullWidth
            error={Boolean(errors?.nome)}
            helperText={errors?.nome?.message}
            {...register("nome", { required: "Esse campo é obrigatório" })}
          />
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
          />
        </Grid>
        <Grid mb={4} item xs={12} md={6}>
          <TextField
            variant="standard"
            label="Valor"
            fullWidth
            error={Boolean(errors?.valor)}
            helperText={errors?.valor?.message}
            {...register("preco", { required: "Esse campo é obrigatório" })}
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
            {...register("descricao")}
          />
        </Grid>
      </Form>
    </>
  );
};

export default CadEs;
