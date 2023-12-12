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
import Form from "../../components/Form";
import PhoneInput from "../../components/PhoneInput";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  atualizarUsuario,
  buscarUsuario,
  cadastrarUsuario,
  deletarUsuario,
} from "./requests.js";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext.jsx";

const CadUsu = () => {
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

  const { data: editData, isLoading } = useQuery({
    queryKey: ["usuario", params.id],
    queryFn: () => buscarUsuario(params.id),
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && !isLoading) {
      setValue("nome", editData.nome);
      setValue("telefone", editData.telefone);
      setValue("cargo", editData.cargo);
      setValue("email", editData.email);
      setValue("tipo", editData.tipo);
    }
  }, [isEdit, editData, isLoading]); // eslint-disable-line

  const handleRemove = async () => {
    if (isEdit) {
      const { data: resData, status } = await deletarUsuario(params.id);
      setAlert({
        open: true,
        message: resData.message,
        severity: status !== 400 ? "success" : "error",
      });
    }
    navigate("/app/usuario");
  };

  const onSubmit = async (user) => {
    let telefoneFormatado = user.telefone.split("(").join("");
    telefoneFormatado = telefoneFormatado.split(")").join("");
    telefoneFormatado = telefoneFormatado.split("-").join("");

    const { data, status } = isEdit
      ? await atualizarUsuario(params.id, {
          ...user,
          telefone: telefoneFormatado,
        })
      : await cadastrarUsuario({
          ...user,
          telefone: telefoneFormatado,
        });

    setAlert({
      open: true,
      message: data.message,
      severity: status !== 400 ? "success" : "error",
    });

    navigate("/app");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        back="/app/usuario"
        remove={handleRemove}
        title="Cadastrar Usuário"
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h6"> Dados Pessoais </Typography>
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
              <PhoneInput
                errors={errors}
                register={register}
                required="Esse campo é obrigatório"
                defaultValue={editData?.telefone}
                setValue={setValue}
              />
            </Grid>
            <Grid mb={4} item xs={12} md={6}>
              <TextField
                variant="standard"
                label="Cargo"
                fullWidth
                error={Boolean(errors?.cargo)}
                helperText={errors?.cargo?.message}
                {...register("cargo", { required: "Esse campo é obrigatório" })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6"> Dados de Acesso </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                fullWidth
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
                {...register("email", { required: "Esse campo é obrigatório" })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={isEdit}
                variant="standard"
                label="Senha"
                type="password"
                fullWidth
                error={Boolean(errors?.senha)}
                helperText={errors?.senha?.message}
                {...register("senha", {
                  required: isEdit ? false : "Esse campo é obrigatório",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />
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
                  defaultValue={editData?.tipo || "FUNCIONARIO"}
                  id="select-input-label"
                  label="Tipo"
                >
                  <MenuItem value="FUNCIONARIO">Funcionario</MenuItem>
                  <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                </Select>
                {errors?.tipo && (
                  <FormHelperText> {errors?.tipo?.message} </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </>
        )}
      </Form>
    </>
  );
};

export default CadUsu;
