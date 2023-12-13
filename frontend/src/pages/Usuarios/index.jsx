import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./requests";
import { Alert, CircularProgress, Container } from "@mui/material";
import TableDefault from "../../components/Table";

const Usuarios = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(new Map());
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });

  const cols = ["Id", "Nome", "Telefone", "Cargo", "Email", "Tipo"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    let auxUsers = users;

    if (data && data.length > 0) {
      page === 0 && auxUsers.clear();

      data?.map((user) => {
        auxUsers.set(user);
      });

      setUsers(auxUsers);
    }

    setTableProps({
      tableName: "Usuários",
      add: "/app/usuario/cadastro",
      edit: "/app/usuario/editar/",
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
