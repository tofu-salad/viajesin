import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { env } from "@/env";
config({ path: ".env.local" });

const client = createClient({ url: env.TURSO_URL, authToken: env.TURSO_TOKEN });
export const db = drizzle(client);
