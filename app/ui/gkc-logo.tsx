import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { lusitana } from "./fonts";

export default function GKCLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <Image
                src="/logo.png"
                width={300}
                height={760}
                alt="Screenshots of the dashboard project showing desktop and mobile versions"
            />
        </div>
    );
}
