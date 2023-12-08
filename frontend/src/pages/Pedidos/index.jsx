import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPedidos } from "./requests";
import { Alert, CircularProgress, Container } from "@mui/material";
import TableDefault from "../../components/Table";

const Pedidos = () => {
  const [page, setPage] = useState(0);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["produtos", page],
    queryFn: () => getPedidos(page),
    keepPreviousData: true,
  });

  let pedidos = new Set();
  const cols = ["Codigo", "Cliente", "Vendedor", "Status", "Data de Pagamento"];

  const [tableProps, setTableProps] = useState(null);

  useEffect(() => {
    data?.map((produto) => pedidos.add(produto));

    setTableProps({
      tableName: "Pedidos",
      add: "/app/pedido/cadastro",
      cols: cols,
      rows: pedidos,
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

export default Pedidos;
