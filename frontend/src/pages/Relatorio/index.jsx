import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useQuery } from "@tanstack/react-query";
import { getRelatorio } from "./requests.js";
import generatePDF from "../../services/pdf.js";

const Relatorio = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["relatorio"],
    queryFn: () => getRelatorio(),
  });

  return (
    <>
      {isLoading ? (
        <Container sx={{ margin: "auto", height: "100vh" }}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <Container sx={{ margin: "auto", height: "100vh" }}>
          <Alert severity="error">{error.message}</Alert>
        </Container>
      ) : (
        <Container
          sx={{
            textAlign: { xs: "center", md: "left" },
            my: 3,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 4,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid mb={4} item xs={12}>
              <Typography variant="h5" fontWeight="bold">
                Relatório Mensal de Pedidos
              </Typography>
            </Grid>
            {data.map((pedido) => (
              <React.Fragment key={pedido.codp}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold">
                    {" "}
                    Codigo do Pedido: {pedido.codp}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  Estado do Pedido: {pedido.estado}
                </Grid>
                <Grid item xs={12} md={6}>
                  Data de pagameto:{" "}
                  {new Date(pedido.data).toLocaleDateString("pt-BR")}
                </Grid>
                <Grid item xs={12} md={6}>
                  Cliente: {pedido.cliente}
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  Vendedor: {pedido.vendedor}
                </Grid>
                <Grid
                  container
                  p={2}
                  borderRadius={4}
                  m={2}
                  boxShadow={"0 0 6px 2px rgba(0, 0, 0, 0.1)"}
                >
                  <Grid item xs={12}>
                    {" "}
                    <Typography fontWeight="bold" fontSize={18} mb={2}>
                      {" "}
                      Produtos do pedido:{" "}
                    </Typography>{" "}
                  </Grid>
                  {pedido.carrinho.map((produto) => (
                    <React.Fragment key={`${pedido.codp} - ${produto.produto}`}>
                      <Grid item xs={12} md={3}>
                        {" "}
                        Produto: {produto.produto}{" "}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        {" "}
                        Quantidade: {produto.quantidade}{" "}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        {" "}
                        Preço individual: R$ {produto.preco}{" "}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={3}
                        display="flex"
                        alignItems={{ xs: "center", md: "flex-end" }}
                        justifyContent={{ xs: "center", md: "flex-end" }}
                      >
                        {" "}
                        Preço item: R$ {produto.preco * produto.quantidade}{" "}
                      </Grid>
                      <Grid
                        item
                        py={2}
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                      >
                        <ShoppingBasketIcon /> Total do carrinho: R${" "}
                        {pedido.total}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </React.Fragment>
            ))}
            <Grid
              item
              py={4}
              mx={2}
              xs={12}
              display="flex"
              justifyContent={{ xs: "center", md: "flex-end" }}
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={() => {
                  generatePDF(data);
                }}
              >
                Gerar PDF
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Relatorio;
