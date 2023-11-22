import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp("postgres://postgres:11082003@localhost:5432/estoque");

export default db;
