import { deleteUserById } from "@/db/queries";

export async function GET() {
  const deleteGuestUser = await deleteUserById("Invitado");

  return Response.json({
    message: `deleted guest ${deleteGuestUser} correctly`,
  });
}
