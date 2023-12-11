import pgPromise from "pg-promise";

const pgp = pgPromise({});

const usuario = "postgres";
const senha = "11082003";

const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/estoque`);

export default db;
