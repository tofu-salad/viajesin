import { eq } from "drizzle-orm";
import type { Adapter, AdapterAccount } from "next-auth/adapters";
import { v4 as uuid } from "uuid";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export function DrizzleAdapterPg(client: NodePgDatabase): Adapter {
  return {
    createUser: async (data) => {
      return client
        .insert(users)
        .values({ ...data, id: uuid() })
        .returning()
        .then((res) => res[0]);
    },
    getUser: async (id) => {
      return (
        client
          .select()
          .from(users)
          .where(eq(users.id, id))
          .then((res) => res[0]) ?? null
      );
    },
    getUserByEmail: async (email) => {
      return (
        client
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((res) => res[0]) ?? null
      );
    },
    async getUserByAccount(provider_providerAccountId) {
      const account = await client
        .select()
        .from(users)
        .leftJoin(
          accounts,
          eq(
            accounts.providerAccountId,
            provider_providerAccountId.providerAccountId
          )
        )
        .then((res) => res[0] ?? null);

      return account.users;
    },
    updateUser: async (data) => {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]);
    },
    deleteUser: async (id) => {
      await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0]);
    },
    linkAccount: async (data) => {
      await client
        .insert(accounts)
        .values(data)
        .returning()
        .then((res) => res[0] as unknown as AdapterAccount);
    },
    unlinkAccount: async (provider_providerAccountId) => {
      await client
        .delete(accounts)
        .where(
          eq(
            accounts.providerAccountId,
            provider_providerAccountId.providerAccountId
          )
        )
        .returning()
        .then((res) => res[0] as unknown as AdapterAccount);
    },
    getSessionAndUser: async (sessionToken) => {
      return (
        client
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .innerJoin(users, eq(users.id, sessions.userId))
          .then((res) => res[0]) ?? null
      );
    },
    createSession: async (data) => {
      return client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },
    updateSession: async (data) => {
      return client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    deleteSession: async (sessionToken) => {
      await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken));
    },
    async createVerificationToken(token) {
      return client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },
    useVerificationToken: async (token) => {
      try {
        return (
          client
            .delete(verificationTokens)
            .where(eq(verificationTokens.identifier, token.identifier))
            .returning()
            .then((res) => res[0]) ?? null
        );
      } catch (err) {
        throw new Error("no verification token found.");
      }
    },
  };
}
