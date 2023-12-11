import { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createCliente } from "./requests";
import PhoneInput from "../../components/PhoneInput";
import Form from "../../components/Form";
import AlertMessage from "../../components/AlertMessage";
import { useNavigate } from "react-router-dom";

const CadCli = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (cliente) => {
    let telefoneFormatado = cliente.telefone.split("(").join("");
    telefoneFormatado = telefoneFormatado.split(")").join("");
    telefoneFormatado = telefoneFormatado.split("-").join("");

    const cpf_cnpj = cliente.cpf_cnpj;
    const cpf = cliente.tipo === "FISICO" ? cpf_cnpj : null;
    const cnpj = cliente.tipo === "JURIDICO" ? cpf_cnpj : null;

    const { data, status } = await createCliente({
      ...cliente,
      telefone: telefoneFormatado,
      cpf,
      cnpj,
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
      <AlertMessage alert={alert} setAlert={setAlert} />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        title="Cadastrar Cliente"
        back="/app/cliente"
      >
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
            {...register("endereco", { required: "Esse campo é obrigatório" })}
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
            {...register("cpf_cnpj", { required: "Esse campo é obrigatório" })}
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
              defaultValue=""
              {...register("tipo", { required: "Esse campo é obrigatório" })}
            >
              <MenuItem value="FISICO">Pessoa Física</MenuItem>
              <MenuItem value="JURIDICO">Pessoa Jurídica</MenuItem>
            </Select>
            {errors.tipo && (
              <FormHelperText>{errors.tipo.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Form>
    </>
  );
};

export default CadCli;
