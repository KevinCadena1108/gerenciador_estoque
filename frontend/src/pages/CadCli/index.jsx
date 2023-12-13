import { useContext, useEffect, useMemo } from "react";
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  createCliente,
  deleteCliente,
  getCliente,
  updateCliente,
} from "./requests";
import PhoneInput from "../../components/PhoneInput";
import Form from "../../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

const CadCli = () => {
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
    queryKey: ["cliente", params?.id],
    queryFn: () => getCliente(params?.id),
    enabled: isEdit,
  });

  useEffect(() => {
    isError && navigate("/app/cliente");

    if (editData && !isLoading) {
      setValue("nome", editData?.nome);
      setValue("endereco", editData?.endereco);
      setValue("email", editData?.email);
      setValue("telefone", editData?.telefone);
      setValue("cpf_cnpj", editData?.cpf || editData?.cnpj);
      setValue("tipo", editData?.tipo);
    }
  }, [editData, isError, isLoading]); // eslint-disable-line

  const onSubmit = async (cliente) => {
    let telefoneFormatado = cliente.telefone.split("(").join("");
    telefoneFormatado = telefoneFormatado.split(")").join("");
    telefoneFormatado = telefoneFormatado.split("-").join("");

    const cpf_cnpj = cliente.cpf_cnpj;
    const cpf = cliente.tipo === "PESSOA FISICA" ? cpf_cnpj : null;
    const cnpj = cliente.tipo === "PESSOA JURIDICA" ? cpf_cnpj : null;

    const { data, status } = isEdit
      ? await updateCliente(params?.id, {
          ...cliente,
          cpf,
          cnpj,
          telefone: telefoneFormatado,
        })
      : await createCliente({
          ...cliente,
          cpf,
          cnpj,
          telefone: telefoneFormatado,
        });

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app/cliente");
  };

  const handleDelete = async () => {
    const { data, status } = await deleteCliente(params?.id);

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app/cliente");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        title="Cadastrar Cliente"
        back="/app/cliente"
        remove={handleDelete}
      >
        {isEdit && isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Dados Pessoais</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="standard"
                label="Nome"
                fullWidth
                error={Boolean(errors.nome)}
                helperText={errors.nome?.message}
                {...register("nome", { required: "Esse campo é obrigatório" })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PhoneInput
                errors={errors}
                register={register}
                defaultValue={editData?.telefone}
                required="Esse campo é obrigatório"
                setValue={setValue}
              />
            </Grid>
            <Grid mb={4} item xs={12} md={6}>
              <TextField
                variant="standard"
                label="Endereço"
                fullWidth
                error={Boolean(errors.endereco)}
                helperText={errors.endereco?.message}
                {...register("endereco", {
                  required: "Esse campo é obrigatório",
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Dados Complementares</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register("email", { required: "Esse campo é obrigatório" })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="standard"
                label="CPF/CNPJ"
                fullWidth
                error={Boolean(errors.cpf_cnpj)}
                helperText={errors.cpf_cnpj?.message}
                {...register("cpf_cnpj", {
                  required: "Esse campo é obrigatório",
                  maxLength: { value: 14, message: "CPF/CNPJ inválido" },
                  minLength: { value: 11, message: "CPF/CNPJ inválido" },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="standard"
                fullWidth
                error={Boolean(errors.tipo)}
              >
                <InputLabel id="select-tipo-label">Tipo</InputLabel>
                <Select
                  labelId="select-tipo-label"
                  label="Tipo"
                  defaultValue={isEdit && editData?.tipo}
                  {...register("tipo", {
                    required: "Esse campo é obrigatório",
                  })}
                >
                  <MenuItem
                    value="PESSOA FISICA"
                    selected={isEdit && editData?.tipo === "PESSOA FISICA"}
                  >
                    Pessoa Física
                  </MenuItem>
                  <MenuItem
                    value="PESSOA JURIDICA"
                    selected={isEdit && editData?.tipo === "PESSOA JURIDICA"}
                  >
                    Pessoa Jurídica
                  </MenuItem>
                </Select>
                {errors.tipo && (
                  <FormHelperText>{errors.tipo.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </>
        )}
      </Form>
    </>
  );
};

export default CadCli;
