import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { getTotalInfo } from "../services/dashboardRequests";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Container } from "@mui/material";
import { auto } from "@popperjs/core";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function Deposits() {
  const { error, isError, data, isLoading } = useQuery({
    queryKey: ["totalData"],
    queryFn: getTotalInfo,
  });

  return isLoading ? (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: auto,
      }}
    >
      <CircularProgress />
    </Container>
  ) : isError ? (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: auto,
      }}
    >
      {error.response?.message || error.message}
    </Container>
  ) : (
    <React.Fragment>
      <Title>Total Vendido</Title>
      <Typography component="p" variant="h4">
        R$ {data.valor}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Faturado nas ultimas 20 vendas
      </Typography>
      <Box>
        <Link to="/app/verVendas">Visualisar vendas</Link>
      </Box>
    </React.Fragment>
  );
}
