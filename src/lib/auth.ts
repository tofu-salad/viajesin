import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";


export const authOptions: AuthOptions = {
        // @ts-ignore
        adapter: DrizzleAdapter(db),

        secret: env.NEXTAUTH_SECRET,
        providers: [
                DiscordProvider({
                        clientId: env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
                        clientSecret: env.DISCORD_CLIENT_SECRET,
                }),
        ],
        callbacks: {
                session: async ({ session, user }) => {
                        if (session.user) {
                                session.user.id = user.id;
                        }
                        return session;
                },
        },
};

export default NextAuth(authOptions);
