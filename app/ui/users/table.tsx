import { UpdateUsers, DeleteUsers } from "@/app/ui/users/buttons";
import UserStatus from "@/app/ui/users/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredUsers } from "@/app/lib/usersDB";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export default async function UsersTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const users = await fetchFilteredUsers(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {users?.map((user) => (
                            <div
                                key={user.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <UserCircleIcon className="w-8 text-crimson-600" />
                                            <p>
                                                {user.first_name}{" "}
                                                {user.last_name}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <UserStatus status={user.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>
                                            {formatDateToLocal(user.created_at)}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateUsers id={user.id} />
                                        <DeleteUsers id={user.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Created At
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3 pl-6 pr-3"
                                >
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users?.map((user) => (
                                <tr
                                    key={user.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <UserCircleIcon className="w-8 text-crimson-600" />
                                            <p>
                                                {user.first_name}{" "}
                                                {user.last_name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(user.created_at)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <UserStatus status={user.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateUsers id={user.id} />
                                            <DeleteUsers id={user.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}