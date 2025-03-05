import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";
import { url } from 'inspector';
import { varchar } from 'drizzle-orm/pg-core';


// Define the `posts` table
export const images = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    userid: varchar("userid",{length:100}).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);
