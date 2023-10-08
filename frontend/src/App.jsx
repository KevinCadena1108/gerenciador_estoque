import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Clientes } from './pages/Clientes';
import { Funcionarios } from './pages/Funcionarios';
import { Estoque } from './pages/Estoque';
import { CadCli } from './pages/CadCli';
import { CadEs } from './pages/CadEs';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Vendas } from './pages/Vendas';
import { Relatorio } from './pages/Relatorio';


const App = () => {
	const theme = createTheme();

	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path='/signin' element={<SignIn />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/' element={<Layout />}>
							<Route index element={<Dashboard />} />
							<Route path='cliente' element={<Clientes />} />
							<Route path='funcionario' element={<Funcionarios />} />
							<Route path='estoque' element={<Estoque />} />
							<Route path='cadcli' element={<CadCli />} />
							<Route path='cades' element={<CadEs />} />
							<Route path='vendas' element={<Vendas />} />
							<Route path='Relatorio' element={<Relatorio />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
};

export default App;
