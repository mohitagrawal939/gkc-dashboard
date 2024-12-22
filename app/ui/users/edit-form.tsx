"use client";

import { Users } from "@/app/lib/definitions";
import {
    AtSymbolIcon,
    CheckIcon,
    KeyIcon,
    NoSymbolIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateUser } from "@/app/lib/usersDB";
import { useFormState } from "react-dom";

export default function EditUserForm({ user }: { user: Users }) {
    const initialState = { message: null, errors: {} };
    const updateUserWithId = updateUser.bind(null, user.id);
    const [state, dispatch] = useFormState(updateUserWithId, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User First Name */}
                <div className="mb-4">
                    <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium"
                    >
                        First Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                defaultValue={user.first_name}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="first_name-error"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {state.errors?.firstName ? (
                        <div
                            id="first_name-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.firstName.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* User Last Name */}
                <div className="mb-4">
                    <label
                        htmlFor="last_name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Last Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                defaultValue={user.last_name}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="last_name-error"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {state.errors?.lastName ? (
                        <div
                            id="last_name-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.lastName.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* User Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                disabled
                                placeholder="Enter email address"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 cursor-not-allowed"
                                aria-describedby="email-error"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div
                        id="email-alert"
                        aria-live="polite"
                        className="mt-0 text-xs text-red-500"
                    >
                        <p>*Cannot update email address.</p>
                    </div>
                </div>

                {/* User Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium"
                    >
                        Password
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="* * * * * * * *"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="password-error"
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {state.errors?.password ? (
                        <div
                            id="password-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.password.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
                {/* User active radio */}
                <div className="mb-4">
                    <fieldset>
                        <legend className="mb-2 block text-sm font-medium">
                            Set the user status
                        </legend>
                        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="active"
                                        name="status"
                                        type="radio"
                                        value="active"
                                        defaultChecked={
                                            user.status === "active"
                                        }
                                        className="focus:ring-crimson-500 h-4 w-4 text-crimson-600 border-gray-300 cursor-pointer"
                                        aria-describedby="status-error"
                                    />
                                    <label
                                        htmlFor="active"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-black dark:text-black"
                                    >
                                        Active
                                        <CheckIcon className="ml-1 w-4 text-black" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="inactive"
                                        name="status"
                                        type="radio"
                                        value="inactive"
                                        defaultChecked={
                                            user.status === "inactive"
                                        }
                                        className="focus:ring-crimson-500 h-4 w-4 text-crimson-600 border-gray-300 cursor-pointer"
                                        aria-describedby="status-error"
                                    />
                                    <label
                                        htmlFor="inactive"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-black dark:text-black"
                                    >
                                        Inactive
                                        <NoSymbolIcon className="ml-1 w-4 text-black" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    {state.errors?.status ? (
                        <div
                            id="status-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.status.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
                {!state.errors && state.message ? (
                    <div
                        id="message-error"
                        aria-live="polite"
                        className="mt-2 text-sm text-red-500"
                    >
                        <p key={state.message}>{state.message}</p>
                    </div>
                ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}
