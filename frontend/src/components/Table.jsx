import { memo, useCallback, useEffect, useRef } from "react";
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
import PerfectScrollBar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";

const TableDefault = ({ props }) => {
  const navigate = useNavigate();
  const { tableName, add, cols, rows, page, setPage, loading, edit } = props;
  let table = useRef();

  const handlerTableScroll = useCallback(
    (event) => {
      const { clientHeight, scrollTop, scrollHeight } = event.target;

      const scroll = scrollTop;
      const end = scrollHeight - clientHeight;

      const porcentageScrolled = Math.round((scroll / end) * 100);

      if (porcentageScrolled > 99 && [...rows].length % 20 === 0 && !loading) {
        setPage(page + 1);
      }
    },
    [page, loading] // eslint-disable-line
  );

  useEffect(() => {
    const tableRef = table?.current;

    tableRef.addEventListener("scroll", handlerTableScroll);

    return () => {
      tableRef.removeEventListener("scroll", handlerTableScroll);
    };
  }, [handlerTableScroll]);

  const navigateToEdit = (id) => {
    navigate(edit + id);
  };

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
        style={{ maxWidth: "100%", margin: "auto", maxHeight: "500px" }}
        ref={table}
      >
        <PerfectScrollBar>
          <Table stickyHeader style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {cols?.map((coluna) => (
                  <TableCell key={coluna}> {coluna} </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                [...rows.values()].map((item) => (
                  <TableRow
                    onClick={() => navigateToEdit(item.id || item.codigo)}
                    sx={{
                      ":hover": {
                        backgroundColor: "rgba(207, 207, 207, 0.5)",
                        cursor: "pointer",
                      },
                    }}
                    key={item.id || `cod-${item.codigo}`}
                  >
                    {Object.keys(item).map((colunaItem) => (
                      <TableCell
                        key={`${item.id || item.codigo}-${colunaItem}`}
                      >
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
                    Carregando: {rows && [...rows].length} elementos
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
        </PerfectScrollBar>
      </TableContainer>
    </Container>
  );
};

export default memo(TableDefault);
