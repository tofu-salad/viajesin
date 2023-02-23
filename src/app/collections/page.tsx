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
        <div className="card w-96 bg-base-100 shadow-xl border border-gray-700">
          <figure className="px-10 pt-10">
            <img src={log.image} alt={log.description} className="rounded-xl" />
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

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
