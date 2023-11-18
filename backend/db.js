import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp("postgres://postgres:postgres@host:port/estoque");

export default db;
