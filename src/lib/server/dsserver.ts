import { createClient } from '@libsql/client';
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/libsql';
import { integer, sqliteTable, text, unique, uniqueIndex } from "drizzle-orm/sqlite-core";

export const Member = sqliteTable("member", {
  id: text("id").primaryKey(),
  guild_id: text("guild_id").notNull(),
  member_id: text("member_id").notNull(),
  legajo: text("legajo"),
  dni: text("dni")
}, (t) => ({
  member_unique: unique().on(t.guild_id, t.member_id),
  legajo_unique: unique().on(t.guild_id, t.legajo),
  dni_unique: unique().on(t.guild_id, t.dni)
}));

export const ServerStats = sqliteTable("server_stats", {
  id: text("id").primaryKey(),
  guild_id: text("guild_id").unique().notNull(),
  bots_count: integer("bots_count").default(0).notNull(),
  members_count: integer("members_count").default(0).notNull(),
  members_online: integer("members_online").default(0).notNull(),
  members_connected: integer("members_connected").default(0).notNull(),
  members_last_day: integer("members_last_day", { mode: "number" }).default(0).notNull(),
  members_last_week: integer("members_last_week", { mode: "number" }).default(0).notNull(),
}, (t) => ({
  guild_id_idx: uniqueIndex('guild_id_idx').on(t.guild_id)
}));

export type TServerStats = typeof ServerStats.$inferSelect;

const client = createClient({
  url: import.meta.env.SHARED_DATABASE_URL,
  authToken: import.meta.env.SHARED_DATABASE_AUTH_TOKEN
});

const db = drizzle(client);

export async function getServerStats(guild_id: string) {
  if (!guild_id) {
    throw new Error(`Guild ID is required to get server stats, invalid '${guild_id}'`);
  }

  return db
    .select()
    .from(ServerStats)
    .where(
      eq(ServerStats.guild_id, guild_id)
    )
    .get();
}
