import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClientes } from "./requests";
import { CircularProgress, Alert, Container } from "@mui/material";
import TableDefault from "../../components/Table";

const Clientes = () => {
  const [page, setPage] = useState(0);
  const [clientes, setClientes] = useState(new Map());
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["clientes", page],
    queryFn: () => getClientes(page),
  });

  const cols = ["Id", "Nome", "Endereço", "Email", "Telefone", "Tipo"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    let auxClientes = clientes;

    if (data && data.length > 0) {
      page === 0 && auxClientes.clear();

      data?.map((cliente) => {
        auxClientes.set(cliente);
      });

      setClientes(auxClientes);
    }

    setTableProps({
      tableName: "Clientes",
      add: "/app/cliente/cadastro",
      edit: "/app/cliente/editar/",
      cols: cols,
      rows: clientes,
      page: page,
      setPage: setPage,
      loading: isFetching || isLoading,
    });
  }, [isLoading, isFetching, page, data]); // eslint-disable-line

  return isError ? (
    <Container
      sx={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert severity="error">
        Error: {error?.response?.message || error?.message}
      </Alert>
    </Container>
  ) : tableProps ? (
    <TableDefault props={tableProps} />
  ) : (
    <CircularProgress />
  );
};

export default Clientes;
