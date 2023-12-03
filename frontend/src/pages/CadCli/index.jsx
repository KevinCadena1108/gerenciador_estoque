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

const CadCli = () => {
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
        title="Cadastrar Cliente"
        back="/app/cliente"
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
            label="Endereço"
            fullWidth
            error={Boolean(errors?.endereco)}
            helperText={errors?.endereco?.message}
            {...register("endereco", { required: "Esse campo é obrigatório" })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6"> Dados Complementares </Typography>
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
            label="CPF/CNPJ"
            fullWidth
            error={Boolean(errors?.cpf)}
            helperText={errors?.cpf?.message}
            {...register("cpf/cnpj")}
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
              defaultValue="PESSOA FISICA"
              id="select-input-label"
              label="Tipo"
            >
              <MenuItem value="PESSOA FISICA">Pessoa Física</MenuItem>
              <MenuItem value="PESSOA JURIDICA">Pessoa Jurídica</MenuItem>
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

export default CadCli;
