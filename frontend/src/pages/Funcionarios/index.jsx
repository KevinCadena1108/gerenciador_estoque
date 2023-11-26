import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./requests";
import { CircularProgress, Typography } from "@mui/material";
import TableDefault from "../../components/Table";

export const Funcionarios = () => {
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
      add: "#",
      cols: cols,
      rows: users,
      page: page,
      setPage: setPage,
      loading: isFetching || isLoading,
    });
  }, [isLoading, isFetching, page, data]); // eslint-disable-line

  return isError ? (
    <Typography>Error: {error?.message}</Typography>
  ) : tableProps ? (
    <TableDefault props={tableProps} />
  ) : (
    <CircularProgress />
  );
};
