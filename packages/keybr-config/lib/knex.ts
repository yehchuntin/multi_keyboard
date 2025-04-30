import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Knex from "knex";
import { Model } from "objection";
import { Env } from "./env.ts";
import { connectMySql } from "./knex/conn-mysql.ts";
import { connectSqlite } from "./knex/conn-sqlite.ts";

export function makeKnex() {
  const config = connect();
  console.log("knex config =", config);
  const knex = Knex(config);
  Model.knex(knex);
  return knex;
}

function connect() {
  const client = Env.getString("DATABASE_CLIENT", "mysql");

  if (client === "mysql") {
    const host = Env.getString("DATABASE_HOST", "localhost");
    const port = Env.getNumber("DATABASE_PORT", 3306);
    const database = Env.getString("DATABASE_DATABASE", "keybr");
    const user = Env.getString("DATABASE_USERNAME", "keybr") || undefined;
    const password = Env.getString("DATABASE_PASSWORD", "") || undefined;

    return {
      client: "mysql",
      connection: {
        host,
        port,
        database,
        user,
        password,
      },
    };
  }

  if (client === "sqlite") {
    let filename = Env.getString("DATABASE_FILENAME", ":memory:");
    if (filename !== ":memory:") {
      filename = Env.asPath(filename);
      mkdirSync(dirname(filename), { recursive: true });
    }

    return {
      client: "sqlite3",
      connection: {
        filename,
      },
      useNullAsDefault: true,
    };
  }

  throw new TypeError(`Unsupported database client [${client}]`);
}
