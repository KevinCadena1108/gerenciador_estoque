import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import DashboardChart from "../components/Chart";

export default function Dashboard() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* GRAFICO */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 350,
              }}
              elevation={0}
            >
              <DashboardChart />
            </Paper>
          </Grid>
          {/* TOTALIZADOR */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 350,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* CLIENTES */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
