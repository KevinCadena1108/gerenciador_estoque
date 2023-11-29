import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "./requests";
import { CircularProgress, Typography } from "@mui/material";
import TableDefault from "../../components/Table";

const Estoque = () => {
  const [page, setPage] = useState(0);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["produtos", page],
    queryFn: () => getProdutos(page),
    keepPreviousData: true,
  });

  let produtos = new Set();
  const cols = ["Id", "Nome", "Descricao", "Preço", "Quantidade"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    data?.map((produto) => produtos.add(produto));

    setTableProps({
      tableName: "Produtos",
      add: "/app/estoque/cadastro",
      cols: cols,
      rows: produtos,
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

export default Estoque;
