import { deleteSessionByUserId, deleteUserById } from "@/db/queries";

export async function GET() {
  await deleteSessionByUserId("Invitado");
  const deleteGuestUser = await deleteUserById("Invitado");
  console.log(deleteGuestUser);

  return Response.json({
    message: `deleted guest ${deleteGuestUser} correctly`,
  });
}
