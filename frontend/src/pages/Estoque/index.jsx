import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "./requests";
import { Alert, CircularProgress, Container } from "@mui/material";
import TableDefault from "../../components/Table";

const Estoque = () => {
  const [page, setPage] = useState(0);
  const [produtos, setProdutos] = useState(new Map());
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["produtos", page],
    queryFn: () => getProdutos(page),
  });

  const cols = ["Id", "Nome", "Descricao", "Preço", "Quantidade"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    let auxProdutos = produtos;

    if (data && data.length > 0) {
      page === 0 && auxProdutos.clear();

      data?.map((produto) => {
        auxProdutos.set(produto.id, produto);
      });

      setProdutos(auxProdutos);
    }

    setTableProps({
      tableName: "Produtos",
      add: "/app/estoque/cadastro",
      edit: "/app/estoque/editar/",
      cols: cols,
      rows: produtos,
      page: page,
      setPage: setPage,
      loading: isFetching || isLoading,
    });
  }, [data]); // eslint-disable-line

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

export default Estoque;
