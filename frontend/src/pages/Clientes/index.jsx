import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Clientes = () => {
  function createData(nome, email, contato, cnpj, ciade) {
    return { nome, email, contato, cnpj, ciade };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <>
      <Grid container my={3} direction="row" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {" "}
          <Link href="/app">
            <ArrowBackIcon fontSize="large" />{" "}
          </Link>
        </Grid>

        <Grid item sm={3} xs={2}>
          {" "}
        </Grid>

        <Grid item xs={2}>
          {" "}
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {" "}
            Clientes{" "}
          </Typography>{" "}
        </Grid>
      </Grid>

      <Container className="tabela">
        <Stack
          my={3}
          useFlexGap
          direction={"row"}
          justifyContent={{ xs: "center", sm: "flex-end" }}
          alignItems={"center"}
        >
          <Link href="/app/cliente/cadastro">
            <Button variant="contained">Cadastrar</Button>
          </Link>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Contato</TableCell>
                <TableCell align="center">Endereço</TableCell>
                <TableCell align="center">CNPJ/CPF</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                  <TableCell align="center">
                    <EditIcon sx={{ mr: 2 }} />
                    <DeleteOutlineIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
