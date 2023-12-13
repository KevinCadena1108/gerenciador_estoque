import { useContext, useEffect, useMemo } from "react";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  createEstoque,
  deleteEstoque,
  getEstoque,
  updateEstoque,
} from "./requests";
import Form from "../../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

const CadEs = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const isEdit = useMemo(() => Boolean(params.id), [params]);

  const {
    data: editData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["estoque", params?.id],
    queryFn: () => getEstoque(params?.id),
    enabled: isEdit,
  });

  useEffect(() => {
    isError && navigate("/app/estoque");

    if (editData) {
      setValue("nome", editData?.nome);
      setValue("quantidade", editData?.quantidade);
      setValue("preco", editData?.preco);
      setValue("descricao", editData?.descricao);
    }
  }, [editData, isError]); // eslint-disable-line

  const onSubmit = async (produto) => {
    const { data, status } = isEdit
      ? await updateEstoque(params?.id, produto)
      : await createEstoque(produto);

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app/estoque");
  };

  const handleDelete = async () => {
    const { data, status } = await deleteEstoque(params?.id);

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app/estoque");
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Cadastrar Estoque"
      back="/app/estoque"
      remove={handleDelete}
    >
      {isEdit && isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
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
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              label="Quantidade"
              type="number"
              fullWidth
              error={Boolean(errors?.quantidade)}
              helperText={errors?.quantidade?.message}
              inputProps={{ inputProps: { min: 0 } }}
              {...register("quantidade", {
                required: "Esse campo é obrigatório",
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              label="Valor"
              type="number"
              fullWidth
              error={Boolean(errors?.valor)}
              helperText={errors?.valor?.message}
              {...register("preco", { required: "Esse campo é obrigatório" })}
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              label="Descrição"
              fullWidth
              error={Boolean(errors?.descricao)}
              helperText={errors?.descricao?.message}
              {...register("descricao")}
            />
          </Grid>
        </Grid>
      )}
    </Form>
  );
};

export default CadEs;
