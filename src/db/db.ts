import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import { env } from "@/env.mjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
const queryConnection = postgres(env.DATABASE_URL, {
  max: 1000,
});
export const db = drizzle(pool);
export type DbClient = typeof db;
