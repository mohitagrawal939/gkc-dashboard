import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import GKCLogo from "@/app/ui/gkc-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-crimson-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <GKCLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-500 p-3 text-sm font-medium text-white hover:bg-gray-100 hover:text-crimson-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Logout</div>
                    </button>
                </form>
            </div>
        </div>
    );
}