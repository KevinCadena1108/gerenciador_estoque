import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const MainListItems = ({ isAdmin }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <Link style={{ color: "black", textDecoration: "none" }} to="/app">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link style={{ color: "black", textDecoration: "none" }} to="/app/pedido">
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Pedidos" />
        </ListItemButton>
      </Link>

      <Link
        style={{ color: "black", textDecoration: "none" }}
        to="/app/estoque"
      >
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Estoque" />
        </ListItemButton>
      </Link>

      <Link
        style={{ color: "black", textDecoration: "none" }}
        to="/app/cliente"
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>
      </Link>

      {isAdmin && (
        <>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/app/usuario"
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItemButton>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/app/relatorio"
          >
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Relatório" />
            </ListItemButton>
          </Link>
        </>
      )}

      <ListItemButton onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
