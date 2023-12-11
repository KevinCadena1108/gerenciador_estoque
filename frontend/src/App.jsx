import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Usuarios from "./pages/Usuarios";
import CadUsu from "./pages/CadUsu";
import CadCli from "./pages/CadCli";
import CadEs from "./pages/CadEs";
import CadPed from "./pages/CadPed";
import { Relatorio } from "./pages/Relatorio";
import Pedidos from "./pages/Pedidos";
import Providers from "./Providers";

const App = () => {
  return (
		<>
			<Providers>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/app/' element={<Layout />}>
						<Route index element={<Dashboard />} />
						<Route path='cliente' element={<Clientes />} />
						<Route path='usuario' element={<Usuarios />} />
						<Route path='estoque' element={<Estoque />} />
						<Route path='cliente/cadastro' element={<CadCli />} />
						<Route path='estoque/cadastro' element={<CadEs />} />
						<Route path='pedido/cadastro' element={<CadPed />} />
						<Route path='usuario/cadastro' element={<CadUsu />} />
						<Route path='cliente/editar/:id' element={<CadCli />} />
						<Route path='estoque/editar/:id' element={<CadEs />} />
						<Route path='pedido/editar/:id' element={<CadPed />} />
						<Route path='usuario/editar/:id' element={<CadUsu />} />
						<Route path='Relatorio' element={<Relatorio />} />
						<Route path='pedido' element={<Pedidos />} />
					</Route>
				</Routes>
			</Providers>
		</>
	);
};

export default App;
