import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env.mjs";

const queryConnection = postgres(env.DATABASE_URL);
export const db = drizzle(queryConnection);
export type DbClient = typeof db;
