import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Link, Typography } from "@mui/material";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  // Adicione mais dados conforme necessário
];

export const Relatorio = () => {
  return (
    <div>
      <Grid container my={3} direction="row" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {" "}
          <Link href="/app">
            <ArrowBackIcon fontSize="large" />{" "}
          </Link>
        </Grid>

        <Grid item sm={3} xs={2}>
          {" "}
        </Grid>

        <Grid item xs={2}>
          {" "}
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {" "}
            Relatórios{" "}
          </Typography>{" "}
        </Grid>
      </Grid>

      {/* Resto do seu código de relatório com o gráfico */}
      <h2>Meu Relatório</h2>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};
