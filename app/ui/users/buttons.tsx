import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteUser } from "@/app/lib/usersDB";

export function AddUsers() {
    return (
        <Link
            href="/dashboard/users/create"
            className="flex h-10 items-center rounded-lg bg-crimson-600 px-4 text-sm font-medium text-white transition-colors hover:bg-crimson-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
        >
            <span className="hidden md:block">Add User</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateUsers({ id }: { id: number }) {
    return (
        <Link
            href={`/dashboard/users/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteUsers({ id }: { id: number }) {
    const deleteUserWithId = deleteUser.bind(null, id);

    return (
        <form action={deleteUserWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
