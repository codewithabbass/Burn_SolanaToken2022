import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TokenBurn - Solana Token 2022 Burn DApp",
    description: "Burn Solana Token 2022 with precision",
    authors: [{ name: "Abbas Ali" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-96x96.png"
                    sizes="96x96"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <title>TokenBurn</title>

                <meta name="description" content="Burn Solana Token 2022" />
                <meta name="author" content="Abbas Ali" />
            </head>
            <body className={`${inter.className} bg-black text-white`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
