import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Clientes } from "./pages/Clientes";
import { Funcionarios } from "./pages/Funcionarios";
import { Estoque } from "./pages/Estoque";
import { CadCli } from "./pages/CadCli";
import { CadEs } from "./pages/CadEs";
import { Vendas } from "./pages/Vendas";
import { Relatorio } from "./pages/Relatorio";
import { CadFun } from "./pages/CadFun";
import Providers from "./Providers";

const App = () => {
  return (
    <>
      <Providers>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cliente" element={<Clientes />} />
            <Route path="funcionario" element={<Funcionarios />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="cliente/cadastro" element={<CadCli />} />
            <Route path="estoque/cadastro" element={<CadEs />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="Relatorio" element={<Relatorio />} />
            <Route path="funcionario/cadastro" element={<CadFun />} />
          </Route>
        </Routes>
      </Providers>
    </>
  );
};

export default App;
