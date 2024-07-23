"use server";
import { deleteUserById } from "@/db/queries";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function delete_account(): Promise<ActionResult | Response> {
  try {
    const { user, session } = await validateRequest();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    try {
      await deleteUserById(user.id);
    } catch (deleteError) {
      console.error("Failed to delete user:", deleteError);
      return {
        error: "Failed to delete user account",
      };
    }

    return redirect("/lule");
  } catch (e) {
    console.error("Error in delete_account:", e);
    return {
      error: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
}

interface ActionResult {
  error: string | null;
}
