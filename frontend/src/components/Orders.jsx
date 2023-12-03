import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClientes } from "../pages/Clientes/requests";
import { CircularProgress, Typography } from "@mui/material";
import TableDefault from "./Table";

const Orders = () => {
  const [page, setPage] = useState(0);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["clientes", page],
    queryFn: () => getClientes(page),
    keepPreviousData: true,
  });

  let clientes = new Set();
  const cols = ["Id", "Nome", "Endereço", "Email", "Telefone", "Tipo"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    data?.map((cliente) => clientes.add(cliente));

    setTableProps({
      tableName: "Clientes",
      add: "/app/cliente/cadastro",
      cols: cols,
      rows: clientes,
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

export default Orders;
