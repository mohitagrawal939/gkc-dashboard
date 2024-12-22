import { CheckIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function UserStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs",
                {
                    "bg-gray-100 text-gray-500": status === "inactive",
                    "bg-green-500 text-white": status === "active",
                }
            )}
        >
            {status === "active" ? (
                <>
                    Active
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : (
                <>
                    Inactive
                    <NoSymbolIcon className="ml-1 w-4 text-gray-500" />
                </>
            )}
        </span>
    );
}
