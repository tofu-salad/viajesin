import { desc, eq } from "drizzle-orm";
import {
  InsertTravelLog,
  InsertUser,
  SelectTravelLog,
  SelectUser,
  travelLogsTable,
  userTable,
} from "./schema";
import { db } from ".";
import { User } from "lucia";

export async function deleteUserById(id: SelectUser["id"]) {
  return db.delete(userTable).where(eq(userTable.id, id));
}

export async function getTravelLogsById(
  id: SelectTravelLog["id"],
): Promise<Array<SelectTravelLog>> {
  return db
    .select()
    .from(travelLogsTable)
    .where(eq(travelLogsTable.userId, id));
}

export async function getLastFiveVisitedPlaces(
  userSession: User | null,
): Promise<Array<SelectTravelLog>> {
  if (!userSession) return [];
  return (
    db
      .select()
      .from(travelLogsTable)
      .where(eq(travelLogsTable.id, userSession.id))
      .limit(5)
      .orderBy(desc(travelLogsTable.visitDate)) || []
  );
}

export async function getAllTravelLogs(): Promise<Array<SelectTravelLog>> {
  return db.select().from(travelLogsTable);
}

export async function createTravelLog(data: InsertTravelLog) {
  await db.insert(travelLogsTable).values(data);
}

export async function updateTravelLog(
  id: SelectTravelLog["id"],
  data: Partial<Omit<SelectTravelLog, "id">>,
) {
  await db.update(travelLogsTable).set(data).where(eq(travelLogsTable.id, id));
}

export async function deleteTravelLog(id: SelectTravelLog["id"]) {
  await db.delete(travelLogsTable).where(eq(travelLogsTable.id, id));
}
export async function getUserById(id: SelectUser["id"]): Promise<SelectUser> {
  return db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((res) => res[0]);
}

export async function getUserByDiscordId(
  id: SelectUser["id"],
): Promise<SelectUser> {
  return db
    .select()
    .from(userTable)
    .where(eq(userTable.discord_id, id))
    .then((res) => res[0]);
}

export async function createUser(data: InsertUser): Promise<SelectUser> {
  return db
    .insert(userTable)
    .values(data)
    .returning()
    .then((res) => res[0]);
}

export async function deleteGuestUser() {
  return db.delete(userTable).where(eq(userTable.id, "guest"));
}
