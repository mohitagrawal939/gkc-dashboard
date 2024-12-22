import postgres from "postgres";
import { Users } from "./app/lib/definitions";

export async function getUserFromDB(email: string): Promise<any> {
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        const users =
            await client`SELECT * from gkc_users where email=${email} AND status='active' AND deleted_at IS NULL`;
        client.end();
        return users?.[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}
