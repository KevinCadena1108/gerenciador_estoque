import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const PhoneInput = ({
  register,
  required,
  errors,
  setValue,
  defaultValue,
  ...params
}) => {
  const handlePhoneChange = (event) => {
    setValue("telefone", event.target.value.replace(/\s/g, ""));
  };

  return (
    <InputMask
      defaultValue={defaultValue}
      mask="(99) 99999-9999"
      maskChar=" "
      onChange={handlePhoneChange}
    >
      {() => (
        <TextField
          fullWidth
          variant="standard"
          label="Telefone"
          name="telefone"
          inputRef={register("telefone", {
            required: required || false,
          })}
          error={Boolean(errors?.telefone)}
          helperText={errors?.telefone?.message}
          {...params}
        />
      )}
    </InputMask>
  );
};

export default PhoneInput;
