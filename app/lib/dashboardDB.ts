import postgres from "postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCardData() {
    noStore();
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        const customerCountPromise = client`SELECT COUNT(*) FROM gkc_customers`;
        const totalActiveUserCountPromise = client`SELECT COUNT(*) FROM gkc_users where status='active' AND deleted_at IS NULL`;
        const totalInActiveUserCountPromise = client`SELECT COUNT(*) FROM gkc_users  where status='inactive' AND deleted_at IS NULL`;
        const userCountPromise = client`SELECT COUNT(*) FROM gkc_users where deleted_at IS NULL`;

        const data = await Promise.all([
            userCountPromise,
            totalActiveUserCountPromise,
            totalInActiveUserCountPromise,
            customerCountPromise,
        ]);
        client.end();
        const numberOfUsers = Number(data[0][0].count ?? "0");
        const numberOfTotalActiveUsers = Number(data[1][0].count ?? "0");
        const numberOfTotalInActiveUsers = Number(data[2][0].count ?? "0");
        const numberOfCustomers = Number(data[3][0].count ?? "0");

        return {
            numberOfCustomers,
            numberOfTotalActiveUsers,
            numberOfTotalInActiveUsers,
            numberOfUsers,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to card data.");
    }
}
