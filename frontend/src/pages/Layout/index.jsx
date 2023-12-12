import * as React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AlertMessage from "../../components/AlertMessage";
import { MainListItems } from "../../components/ListItems";
import { CircularProgress, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 100,
    },
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        width: 0,
      },
    }),
  },
}));

const Layout = () => {
  const { isAuthenticated, user, signOut } = React.useContext(AuthContext);
  const { alert, setAlert } = React.useContext(AlertContext);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    isMobile && setOpen(false);
  }, [isMobile, isAuthenticated, signOut]);

  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar elevation={1} position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component={"img"}
                sx={{ maxWidth: 40, mr: 2 }}
                src={"/logo.png"}
                alt="Logo"
              />
              <Typography
                component="h1"
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {document.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems isAdmin={user?.tipo === "ADMINISTRADOR"} />
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {open && isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, .3)",
                  zIndex: 99,
                }}
              >
                {" "}
              </Box>
            )}

            <Toolbar />
            <Container
              sx={{
                width: { md: `calc(100vw - ${drawerWidth}px)`, xs: "90vw" },
              }}
            >
              <AlertMessage alert={alert} setAlert={setAlert} />
              <Outlet />
            </Container>
          </Box>
        </Box>
      ) : (
        <Container
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </>
  );
};

export default Layout;
