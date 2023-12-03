import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const AlertMessage = ({ alert, setAlert }) => {
  useState(() => {
    console.log(alert);
  }, [alert]);

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
