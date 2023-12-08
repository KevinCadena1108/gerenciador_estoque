import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Autocomplete,
  Box,
  Fab,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { getProdutosForSelect } from "./requests.js";

import Form from "../../components/Form";

const CadPed = () => {
  const [carrinho, setCarrinho] = useState(new Set());
  const [novoProduto, setNovoProduto] = useState({});
  const { isLoading, data: produtos } = useQuery({
    queryKey: ["produtosSelect"],
    queryFn: getProdutosForSelect,
  });

  const produtosSelect = useMemo(() => {
    return produtos?.filter(
      (produto) =>
        !Array.from(carrinho).some((item) => item.produtoId === produto.value)
    );
  }, [produtos, carrinho]);

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

  const adicionarCarrinho = (produto) => {
    const nome = produtos.find(
      (item) => item.value === produto.produtoId
    ).label;
    const thisCar = new Set(carrinho);
    !Array.from(carrinho).find(
      (item) => item.produtoId === produto.produtoId
    ) && thisCar.add({ ...produto, produto: nome });
    setCarrinho(thisCar);
  };

  const removeCarrinho = (item) => {
    setCarrinho((carrinho) => {
      const thisCar = new Set(carrinho);
      thisCar.delete(item);
      return thisCar;
    });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Realizar Pedido"
          back="/app"
        >
          <Grid item xs={12}>
            <Typography variant="h6"> Dados do Pedido </Typography>
          </Grid>
          <Grid mb={2} item xs={12} md={6}>
            <Autocomplete
              disablePortal
              options={[{ label: "The Godfather", id: 1972 }]}
              fullWidth
              {...register("cliente", { required: "Esse campo é obrigatório" })}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              options={[{ label: "The Godfather", id: 1972 }]}
              fullWidth
              {...register("vendedor", {
                required: "Esse campo é obrigatório",
              })}
              renderInput={(params) => (
                <TextField {...params} label="Vendedor" variant="standard" />
              )}
            />
          </Grid>
          <Grid my={4} item xs={12} md={6}>
            <DateTimePicker
              {...register("data", { required: "Esse campo é obrigatório" })}
              slotProps={{
                textField: { variant: "standard", fullWidth: true },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6"> Produtos do Pedido </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <FormControl
              variant="standard"
              fullWidth
              error={Boolean(errors?.produto)}
            >
              <InputLabel id="select-input-label">Tipo</InputLabel>
              <Select
                value={novoProduto.produtoId}
                onChange={({ target: { value } }) => {
                  setNovoProduto({
                    ...novoProduto,
                    produtoId: value,
                  });
                }}
                id="select-input-label"
                label="Tipo"
              >
                {produtosSelect.map((produto) => (
                  <MenuItem key={produto.value} value={produto.value}>
                    {" "}
                    {produto.label}{" "}
                  </MenuItem>
                ))}
              </Select>
              {errors?.tipo && (
                <FormHelperText> {errors?.produto?.message} </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid mb={2} item xs={12} md={5}>
            <TextField
              variant="standard"
              label="Quantidade"
              fullWidth
              value={novoProduto.quantidade}
              onChange={({ target: { value } }) => {
                setNovoProduto({
                  ...novoProduto,
                  quantidade: value,
                });
              }}
              error={Boolean(errors?.quantidade)}
              helperText={errors?.quantidade?.message}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box
              display="flex"
              width={"100%"}
              height={"100%"}
              justifyContent="center"
              alignItems="flex-end"
            >
              <Fab
                sx={{ fontSize: 18 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  adicionarCarrinho(novoProduto);
                }}
              >
                +
              </Fab>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent={"center"}>
              {Array.from(carrinho).map((produto) => (
                <React.Fragment key={produto.produtoId}>
                  <Grid item xs={12} md={5}>
                    <TextField
                      variant="standard"
                      label="Produto"
                      fullWidth
                      value={produto.produto}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      variant="standard"
                      label="Quantidade"
                      fullWidth
                      value={produto.quantidade}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Fab
                      color="error"
                      onClick={() => {
                        removeCarrinho(produto);
                      }}
                    >
                      X
                    </Fab>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
};

export default CadPed;
