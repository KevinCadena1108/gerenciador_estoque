import React, { useMemo, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  CircularProgress,
  Autocomplete,
  Box,
  Fab,
  Button,
  InputLabel,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";

import {
  criarPedido,
  getClientesAutocomplete,
  getProdutosForSelect,
  getUsuariosAutocomplete,
} from "./requests.js";

import Form from "../../components/Form";
import AlertMessage from "../../components/AlertMessage.jsx";

const CadPed = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [errors, setErrors] = useState({});
  const [carrinho, setCarrinho] = useState(new Set());
  const [formulario, setForumlario] = useState({
    data: null,
    cliente: "",
    vendedor: "",
    estado: "",
  });
  const [novoProduto, setNovoProduto] = useState({
    produtoId: null,
    produto: "",
    quantidade: "",
  });
  const { isLoading: isLoadingProducts, data: produtos } = useQuery({
    queryKey: ["produtosSelect"],
    queryFn: getProdutosForSelect,
  });
  const { isLoading: isLoadingUsers, data: usuarios } = useQuery({
    queryKey: ["usuariosSelect"],
    queryFn: getUsuariosAutocomplete,
  });
  const { isLoading: isLoadingClients, data: clientes } = useQuery({
    queryKey: ["clientesSelect"],
    queryFn: getClientesAutocomplete,
  });

  const produtosSelect = useMemo(() => {
    return produtos
      ?.filter(
        (produto) =>
          !Array.from(carrinho).some((item) => item.produtoId === produto.value)
      )
      .map((produto) => ({ label: produto.label, id: produto.value }));
  }, [produtos, carrinho]);

  const validate = () => {
    formulario.data === null
      ? setErrors({ ...errors, data: "Campo obrigatório" })
      : setErrors({ ...errors, data: null });

    formulario.cliente === ""
      ? setErrors({ ...errors, cliente: "Campo obrigatório" })
      : setErrors({ ...errors, cliente: null });

    formulario.vendedor === ""
      ? setErrors({ ...errors, vendedor: "Campo obrigatório" })
      : setErrors({ ...errors, vendedor: null });

    carrinho.size === 0
      ? setErrors({
          ...errors,
          carrinho: "Deve ter pelo menos um produto no carrinho",
        })
      : setErrors({ ...errors, carrinho: null });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    validate();

    if (errors?.carrinho || errors?.data || errors?.cliente || errors?.vendedor)
      return;

    const data = {
      cliente: clientes.find((item) => item.label === formulario.cliente).id,
      vendedor: usuarios.find((item) => item.label === formulario.vendedor).id,
      data: formulario.data,
      estado: formulario.estado,
      carrinho: Array.from(carrinho).map((item) => ({
        ...item,
        quantidade: parseInt(item.quantidade),
      })),
    };

    const { data: resData, status } = await criarPedido(data);

    setAlert({
      open: true,
      message: resData.message,
      severity: status !== 400 ? "success" : "error",
    });
  };

  const adicionarCarrinho = (produto) => {
    if (!produto.produto || !produto.quantidade) return;

    const id = produtos.find((item) => item.label === produto.produto).value;

    const thisCar = new Set(carrinho);

    !Array.from(carrinho).find((item) => item.produto === produto.produto) &&
      thisCar.add({ ...produto, produtoId: id });

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
      {isLoadingProducts && isLoadingClients && isLoadingUsers ? (
        <CircularProgress />
      ) : (
        <>
          <AlertMessage alert={alert} setAlert={setAlert} />

          <Form onSubmit={onSubmit} title="Realizar Pedido" back="/app">
            <Grid item xs={12}>
              <Typography variant="h6"> Dados do Pedido </Typography>
            </Grid>
            <Grid mb={2} item xs={12} md={6}>
              <Autocomplete
                disablePortal
                options={isLoadingClients ? [] : clientes}
                fullWidth
                inputValue={formulario.cliente}
                onInputChange={(e, value) => {
                  setForumlario({ ...formulario, cliente: value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(errors?.cliente)}
                    helperText={errors?.cliente}
                    label="Cliente"
                    required
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                options={isLoadingUsers ? [] : usuarios}
                fullWidth
                inputValue={formulario.vendedor}
                onInputChange={(e, value) => {
                  setForumlario({ ...formulario, vendedor: value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vendedor"
                    required
                    error={Boolean(errors?.vendedor)}
                    helperText={errors?.vendedor}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid mb={4} item xs={12} md={6}>
              <InputLabel sx={{ mb: 1 }}>Data</InputLabel>
              <DatePicker
                label="Data"
                format="dd/MM/YYYY"
                value={formulario.data}
                onChange={(newValue) => {
                  setForumlario({ ...formulario, data: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    fullWidth
                    required
                    error={Boolean(errors?.data)}
                    helperText={errors?.data}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mt: 2 }}
                label="Estado"
                variant="standard"
                fullWidth
                required
                value={formulario.estado}
                onChange={({ target: { value } }) => {
                  setForumlario({
                    ...formulario,
                    estado: value,
                  });
                }}
              />
            </Grid>

            {errors?.carrinho && (
              <Grid item xs={12}>
                <Alert severity="error">{errors?.carrinho}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6"> Produtos do Pedido </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Autocomplete
                inputValue={novoProduto.produto}
                onInputChange={(e, value) => {
                  setNovoProduto({
                    ...novoProduto,
                    produto: value,
                  });
                }}
                options={isLoadingProducts ? [] : produtosSelect}
                id="select-input-label"
                label="Tipo"
                renderInput={(params) => (
                  <TextField {...params} label="Produto" variant="standard" />
                )}
              />
            </Grid>

            <Grid mb={2} item xs={12} md={5}>
              <TextField
                variant="standard"
                label="Quantidade"
                fullWidth
                inputProps={{ type: "number", min: 1 }}
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
            <Grid item xs={12} md={2}>
              <Box
                display="flex"
                width={"100%"}
                height={"100%"}
                justifyContent="center"
                alignItems="flex-end"
              >
                <Button
                  sx={{ width: { xs: "50%", md: "100%" } }}
                  variant="outlined"
                  onClick={() => {
                    adicionarCarrinho(novoProduto);
                  }}
                >
                  Inserir
                </Button>
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
                    <Grid item xs={2}>
                      <Fab
                        size="small"
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
        </>
      )}
    </>
  );
};

export default CadPed;
