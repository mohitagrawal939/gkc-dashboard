import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s - GKC Dashboard | @mohitagrawal939",
        default: "GKC Dashboard by @mohitagrawal939",
    },
    description:
        "GKC Dashboard with official NextJS dahboard template with APP router.",
    metadataBase: new URL("hhttps://gkc-dashboard.vercel.app"),
    authors: [
        {
            name: "Mohit Agrawal",
            url: "https://www.linkedin.com/in/mohitagrawal939",
        },
    ],
    keywords: [
        "Next.js 14",
        "GKC",
        "Dashboard",
        "nextjs.org/learn",
        "Server Actions",
    ],
    openGraph: {
        title: "GKC Dashboard",
        description:
            "GKC Dashboard with official NextJS dahboard template with APP router.",
        url: "https://gkc-dashboard.vercel.app/",
        type: "website",
    },
    twitter: {
        site: "@gkc",
        description:
            "GKC Dashboard with official NextJS dahboard template with APP router.",
        title: "GKC Dashboard by @mohitagrawal939",
        creator: "@mohitagrawal939",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
