import { Alert, Snackbar } from "@mui/material";

const AlertMessage = ({ alert, setAlert }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={alert.open}
      autoHideDuration={5000}
      onClose={() => setAlert({ ...alert, open: false })}
    >
      <Alert
        onClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
