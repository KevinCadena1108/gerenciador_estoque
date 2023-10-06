import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Clientes } from './pages/Clientes';
import { Funcionarios } from './pages/Funcionarios';
import { Estoque } from './pages/Estoque';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

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
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
};

export default App;
