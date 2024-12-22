import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s - GKC Dashboard | @mohitagrawal939",
        default: "GKC Dashboard by @mohitagrawal939",
    },
    description:
        "The official Next.js Course Dashboard, built with App Router.",
    metadataBase: new URL("https://nextjs-dashboard-acme.vercel.app"),
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
            "The official Next.js Learn Dashboard built with App Router.",
        url: "https://nextjs-dashboard-acme.vercel.app",
        type: "website",
    },
    twitter: {
        site: "@gkc",
        description:
            "The official Next.js Learn Dashboard built with App Router.",
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
