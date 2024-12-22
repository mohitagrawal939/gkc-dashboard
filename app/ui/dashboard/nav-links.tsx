"use client";

import {
    UserGroupIcon,
    HomeIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
    { name: "App Users", href: "/dashboard/users", icon: UserPlusIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex h-[48px] grow items-center cursor-pointer justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-crimson-100 hover:text-crimson-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
                            pathname === link.href
                                ? "bg-crimson-100 text-crimson-600"
                                : ""
                        }`}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
