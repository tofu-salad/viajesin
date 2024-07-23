"use server";

import { createUser, getUserById } from "@/db/queries";
import { SelectUser } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginGuestUser(): Promise<ActionResult> {
  const guestUser: SelectUser = {
    id: "Invitado",
    username: "Invitado",
    avatar: null,
    discord_id: null,
  };
  let existingUser = await getUserById(guestUser.id);
  if (!existingUser) {
    const newUser = await createUser({
      username: guestUser.username,
      id: guestUser.id,
    });
    existingUser = newUser;
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
