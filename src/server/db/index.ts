import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema"; // Ensure this points to your schema file

export const db = drizzle(sql, { schema });
