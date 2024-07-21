import { eq } from "drizzle-orm";
import { InsertTravelLog, SelectTravelLog, travelLogsTable } from "./schema";
import { db } from ".";
type Session = {
        id: string;
} & {
        name?: string | null;
        email?: string | null;
        image?: string | null;
} | undefined


export async function getLastVisitedPlacesBySessionId(session: Session) {
        if (session) {
                return db.select().from(travelLogsTable).where(eq(travelLogsTable.userId, session.id))
        } else return [];
}

export async function getTravelLogsById(id: SelectTravelLog['id']): Promise<Array<SelectTravelLog>> {
        return db.select().from(travelLogsTable).where(eq(travelLogsTable.userId, id))

}

export async function getAllTravelLogs(): Promise<Array<SelectTravelLog>> {
        return db.select().from(travelLogsTable)

}

export async function createTravelLog(data: InsertTravelLog) {
        await db.insert(travelLogsTable).values(data)
}

export async function updateTravelLog(id: SelectTravelLog['id'], data: Partial<Omit<SelectTravelLog, 'id'>>) {
        await db.update(travelLogsTable).set(data).where(eq(travelLogsTable.id, id));
}


export async function deleteTravelLog(id: SelectTravelLog['id']) {
        await db.delete(travelLogsTable).where(eq(travelLogsTable.id, id))
}
