import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";

const Form = ({ children, onSubmit, back, remove, title }) => {
  const { id } = useParams();

  return (
    <Container
      sx={{
        my: 3,
        backgroundColor: "white",
        width: "100%",
        borderRadius: 4,
        p: 4,
      }}
    >
      <form onSubmit={onSubmit}>
        <Grid spacing={2} mb={4} container>
          <Grid mb={4} item xs={12}>
            <Typography
              textAlign={{ xs: "center", md: "start" }}
              fontWeight="bold"
              variant="h5"
            >
              {title}
            </Typography>
          </Grid>
          {children}
        </Grid>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: { md: "flex-end", xs: "center" },
          }}
        >
          <Link to={back}>
            <Button startIcon={<UndoIcon />} variant="outlined">
              Cancelar
            </Button>
          </Link>
          {id && (
            <Button
              startIcon={<DeleteIcon />}
              onClick={remove}
              variant="contained"
              color="error"
            >
              Remover
            </Button>
          )}
          <Button endIcon={<SendIcon />} type="submit" variant="contained">
            {id ? "Atualizar" : "Cadastrar"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Form;
