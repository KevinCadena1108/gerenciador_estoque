import { useCallback, useEffect, useRef, useState } from "react";
import {
	Button,
	Container,
	LinearProgress,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

const TableDefault = ({ props }) => {
	const { tableName, add, cols, rows, page, setPage, loading } = props;
	const [data, setData] = useState(null);
	let table = useRef();

	const handlerTableScroll = useCallback(
		async (event) => {
			const { clientHeight, scrollTop, scrollHeight } = event.target;

			const scroll = scrollTop;
			const end = scrollHeight - clientHeight;

			const porcentageScrolled = Math.round((scroll / end) * 100);

			if (porcentageScrolled > 99 && [...data].length === 20 && !loading) {
				await setPage(page + 1);
			}
		},
		[page, loading]
	); // eslint-disable-line

	useEffect(() => {
		setData(rows);
	}, [rows]);

	useEffect(() => {
		const tableRef = table?.current;

		tableRef.addEventListener('scroll', handlerTableScroll);

		return () => {
			tableRef.removeEventListener('scroll', handlerTableScroll);
		};
	}, [handlerTableScroll]);

	return (
		<Container
			sx={{
				my: 3,
				backgroundColor: 'white',
				width: '100%',
				borderRadius: 4,
				p: 4
			}}
		>
			<Stack
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 4,
					flexDirection: { md: 'row', xs: 'column' },
					mb: 4
				}}
			>
				<Typography variant='h5' fontWeight={'bold'}>
					{tableName}
				</Typography>
				<Link to={add}>
					<Button variant='contained'>Cadastrar</Button>
				</Link>
			</Stack>
			<TableContainer style={{ maxWidth: '100%', margin: 'auto', maxHeight: '500px' }} ref={table}>
				<PerfectScrollBar>
					<Table stickyHeader style={{ width: '100%' }}>
						<TableHead>
							<TableRow>
								{cols?.map((coluna) => (
									<TableCell key={coluna}> {coluna} </TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data &&
								[...data].map((item) => (
									<TableRow key={item.id}>
										{Object.keys(item).map((colunaItem) => (
											<TableCell key={`${item.id}-${colunaItem}`}>{item[colunaItem]}</TableCell>
										))}
									</TableRow>
								))}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell colSpan={cols.length}>
									<Typography textAlign={'center'}>Carregando: {data && [...data].length} elementos</Typography>
								</TableCell>
							</TableRow>

							{loading && (
								<TableRow>
									<TableCell colSpan={cols.length}>
										<LinearProgress style={{ width: '100%' }} />
									</TableCell>
								</TableRow>
							)}
						</TableFooter>
					</Table>
				</PerfectScrollBar>
			</TableContainer>
		</Container>
	);
};

export default TableDefault;
