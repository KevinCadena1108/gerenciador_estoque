import pgPromise from "pg-promise";

const pgp = pgPromise({});

const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;

const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/estoque`);

export default db;
