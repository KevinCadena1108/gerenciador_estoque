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
} from "@mui/material";
import { useForm } from "react-hook-form";

import PhoneInput from "../../components/PhoneInput";
import Form from "../../components/Form";

const CadUsu = () => {
  const {
    register,
    handleSubmit,
    setValue,
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
        title="Cadastrar Usuário"
        back="/app/usuario"
      >
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
            variant="standard"
            label="Senha"
            type="password"
            fullWidth
            error={Boolean(errors?.senha)}
            helperText={errors?.senha?.message}
            {...register("senha", {
              required: "Esse campo é obrigatório",
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
              defaultValue="FUNCIONARIO"
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
      </Form>
    </>
  );
};

export default CadUsu;
