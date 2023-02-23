import client from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export default async function CollectionPage() {
  const user = await getCurrentUser();
  const logs = await client.travelLog.findMany({
    where: { userId: user?.id },
  });

  return (
    <main className="flex gap-2 m-2">
      {logs.map((log) => (
        <div
          className="card w-96 bg-base-100 shadow-xl border border-gray-700"
          key={log.id}
        >
          <figure className="px-10 pt-10">
            <img
              src={log.image}
              alt={log.description}
              className="rounded-xl bg-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{log.title}</h2>
            <p>{log.description}</p>
            <p>{log.rating} / 10</p>
            <p>{log.visitDate.toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
