import { integer, sqliteTable, text, primaryKey, real } from "drizzle-orm/sqlite-core"
import type { AdapterAccount } from "next-auth/adapters"
import { sql } from "drizzle-orm"

export const users = sqliteTable("user", {
        id: text("id")
                .primaryKey()
                .$defaultFn(() => crypto.randomUUID()),
        name: text("name"),
        email: text("email").notNull(),
        emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
        image: text("image"),
})

export const accounts = sqliteTable(
        "account",
        {
                userId: text("userId")
                        .notNull()
                        .references(() => users.id, { onDelete: "cascade" }),
                type: text("type").$type<AdapterAccount>().notNull(),
                provider: text("provider").notNull(),
                providerAccountId: text("providerAccountId").notNull(),
                refresh_token: text("refresh_token"),
                access_token: text("access_token"),
                expires_at: integer("expires_at"),
                token_type: text("token_type"),
                scope: text("scope"),
                id_token: text("id_token"),
                session_state: text("session_state"),
        },
        (account) => ({
                compoundKey: primaryKey({
                        columns: [account.provider, account.providerAccountId],
                }),
        })
)

export const sessions = sqliteTable("session", {
        sessionToken: text("sessionToken").primaryKey(),
        userId: text("userId")
                .notNull()
                .references(() => users.id, { onDelete: "cascade" }),
        expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
        "verificationToken",
        {
                identifier: text("identifier").notNull(),
                token: text("token").notNull(),
                expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
        },
        (verificationToken) => ({
                compositePk: primaryKey({
                        columns: [verificationToken.identifier, verificationToken.token],
                }),
        })
)

export const authenticators = sqliteTable(
        "authenticator",
        {
                credentialID: text("credentialID").notNull().unique(),
                userId: text("userId")
                        .notNull()
                        .references(() => users.id, { onDelete: "cascade" }),
                providerAccountId: text("providerAccountId").notNull(),
                credentialPublicKey: text("credentialPublicKey").notNull(),
                counter: integer("counter").notNull(),
                credentialDeviceType: text("credentialDeviceType").notNull(),
                credentialBackedUp: integer("credentialBackedUp", {
                        mode: "boolean",
                }).notNull(),
                transports: text("transports"),
        },
        (authenticator) => ({
                compositePK: primaryKey({
                        columns: [authenticator.userId, authenticator.credentialID],
                }),
        })
)
export const travelLogsTable = sqliteTable("travel_logs", {
        id: text("id")
                .primaryKey()
                .$defaultFn(() => crypto.randomUUID()),
        userId: text("userId")
                .notNull()
                .references(() => users.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        description: text("description").notNull(),
        image: text("image").notNull(),
        rating: integer("rating"),
        visitDate: integer("visit_date", { mode: "timestamp_ms" }).notNull(),
        latitude: real("latitude").notNull(),
        longitude: real("longitude").notNull(),
        createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export type SelectUser = typeof users.$inferSelect;
export type SelectTravelLog = typeof travelLogsTable.$inferSelect;
export type InsertTravelLog = typeof travelLogsTable.$inferInsert;
