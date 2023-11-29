import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Usuarios from "./pages/Usuarios";
import CadUsu from "./pages/CadUsu";
import { CadCli } from "./pages/CadCli";
import { CadEs } from "./pages/CadEs";
import { Vendas } from "./pages/Vendas";
import { Relatorio } from "./pages/Relatorio";
import { VerVendas } from "./pages/VerVendas";
import Providers from "./Providers";

const App = () => {
  return (
    <>
      <Providers>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/app/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cliente" element={<Clientes />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="cliente/cadastro" element={<CadCli />} />
            <Route path="estoque/cadastro" element={<CadEs />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="Relatorio" element={<Relatorio />} />
            <Route path="usuario/cadastro" element={<CadUsu />} />
            <Route path="vervendas" element={<VerVendas />} />
          </Route>
        </Routes>
      </Providers>
    </>
  );
};

export default App;
