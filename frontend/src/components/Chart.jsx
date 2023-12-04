import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Chart from "react-apexcharts";
import { getChartInfo } from "../services/dashboardRequests";
import { Link } from "react-router-dom";

export default function DashboardChart() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  const [produtos, setProdutos] = useState(new Set());
  const [vendas, setVendas] = useState(new Set());
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["chartData"],
    queryFn: getChartInfo,
  });

  useEffect(() => {
    if (data) {
      setProdutos(new Set(data.map((item) => item.produto)));
      setVendas(new Set(data.map((item) => parseInt(item.quantidade))));
    }
  }, [data]);

  const chartOptions = useMemo(
    () => ({
      options: {
        labels: [...produtos],
        title: { text: "Porcentagem de vendas", align: "center" },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                },
              },
            },
          },
        },
        legend: {
          position: md ? "right" : "bottom",
        },
      },
      series: [...vendas],
    }),
    [produtos, vendas, md]
  );

  return (
    <>
      {isLoading ? (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 80,
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
          }}
        >
          <Alert severity="error">
            {error?.response?.message || error?.message}
          </Alert>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.length > 0 ? (
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              labels={chartOptions.labels}
              type="donut"
              width={md ? 450 : sm ? 400 : 350}
            />
          ) : (
            <>
              <Typography variant="h6">
                Nenhum pedido efetuado até o momento
              </Typography>
              <Link to="/app/vendas">Cadastrar agora</Link>
            </>
          )}
        </Container>
      )}
    </>
  );
}
