import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config.js";
import AppError from "./AppError.js";
import { router } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      message: err.message,
    });

  return res.status(500).json({
    status: "error",
    message: `Erro interno do servidor - ${err.message}`,
  });
});

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));
