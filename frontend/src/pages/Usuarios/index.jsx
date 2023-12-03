import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./requests";
import { Alert, CircularProgress, Container } from "@mui/material";
import TableDefault from "../../components/Table";

const Usuarios = () => {
  const [page, setPage] = useState(0);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    keepPreviousData: true,
  });

  let users = new Set();
  const cols = ["Id", "Nome", "Telefone", "Cargo", "Email", "Tipo"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    data?.map((user) => users.add(user));

    setTableProps({
      tableName: "Usuários",
      add: "/app/usuario/cadastro",
      cols: cols,
      rows: users,
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

export default Usuarios;
