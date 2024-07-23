import { deleteGuestUser } from "@/db/queries";

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (apiKey !== process.env.API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json();
    if (action !== "deleteGuestUser") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    await deleteGuestUser();
    return Response.json({ message: "Deleted guest correctly" });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
