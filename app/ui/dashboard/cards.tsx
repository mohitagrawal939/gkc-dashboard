import {
    CheckIcon,
    NoSymbolIcon,
    UserGroupIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/dashboardDB";

const iconMap = {
    customers: UserGroupIcon,
    active: CheckIcon,
    inactive: NoSymbolIcon,
    users: UserPlusIcon,
};

export default async function CardWrapper() {
    const {
        numberOfTotalActiveUsers,
        numberOfTotalInActiveUsers,
        numberOfUsers,
        numberOfCustomers,
    } = await fetchCardData();
    return (
        <>
            <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
            <Card
                title="Active Users"
                value={numberOfTotalActiveUsers}
                type="active"
            />
            <Card
                title="Inactive Users"
                value={numberOfTotalInActiveUsers}
                type="inactive"
            />
            <Card title="App Users" value={numberOfUsers} type="users" />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: "customers" | "active" | "inactive" | "users";
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
