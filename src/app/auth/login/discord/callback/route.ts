import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { discord, lucia } from "@/lib/auth";
import { createUser, getUserByDiscordId } from "@/db/queries";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("discord_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const discordUser: DiscordUser = await discordUserResponse.json();
    const existingUser = await getUserByDiscordId(discordUser.id);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/map",
        },
      });
    }
    const avatar = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
    const newUser = await createUser({
      discord_id: discordUser.id,
      username: discordUser.username,
      avatar: avatar,
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/map",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
};
