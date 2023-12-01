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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const TableDefault = ({ props }) => {
  const { tableName, add, cols, rows, page, setPage, loading } = props;
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [data, setData] = useState(null);
  const table = useRef();

  const scrollListener = useCallback(() => {
    let bottom = table.current.scrollHeight - table.current.clientHeight;

    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.2));
    }
    if (table.current.scrollTop > bottom - distanceBottom && !loading) {
      setPage(page + 1);
    }
  }, [loading, distanceBottom, page]); // eslint-disable-line

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    const tableRef = table?.current;

    tableRef.addEventListener("scroll", scrollListener);

    return () => {
      tableRef.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <Container
      sx={{
        my: 3,
        backgroundColor: "white",
        width: "100%",
        borderRadius: 4,
        p: 4,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          flexDirection: { md: "row", xs: "column" },
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          {tableName}
        </Typography>
        <Link to={add}>
          <Button variant="contained">Cadastrar</Button>
        </Link>
      </Stack>
      <TableContainer
        style={{ maxWidth: "100%", margin: "auto", maxHeight: "300px" }}
        ref={table}
      >
        <Table stickyHeader style={{ width: "100%" }}>
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
                    <TableCell key={`${item.id}-${colunaItem}`}>
                      {item[colunaItem]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={cols.length}>
                <Typography textAlign={"center"}>
                  {" "}
                  Carregando: {(page + 1) * 20}{" "}
                </Typography>
              </TableCell>
            </TableRow>

            {loading && (
              <TableRow>
                <TableCell colSpan={cols.length}>
                  <LinearProgress style={{ width: "100%" }} />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableDefault;
