"use client";
import { connection, DOC_URL } from "@/lib/config";
import { Flame } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import WalletConnect from "./WalletConnect";

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [network, setNetwork] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (connection.rpcEndpoint) {
            if (connection.rpcEndpoint.includes("devnet")) {
                setNetwork("Devnet");
            } else {
                setNetwork("Mainnet");
            }
        }
    }, [connection]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "glass py-4" : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover-scale">
                    <Flame
                        size={24}
                        className="text-primary animate-pulse-glow"
                    />
                    <span className="font-semibold text-xl tracking-tight text-foreground">
                        Token<span className="text-primary">Burn</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-foreground/80 hover:text-primary transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href={DOC_URL}
                        className="text-foreground/80 hover:text-primary transition-colors duration-200"
                        target="_blank"
                    >
                        Documentation
                    </Link>

                    {network && (
                        <Button className="uppercase glass-card px-4 py-2 text-primary hover:text-white hover:bg-primary/80 transition-colors cursor-text duration-200">
                            {network}
                        </Button>
                    )}

                    <WalletConnect />
                </nav>

                <div className="md:hidden">
                    <Sidebar network={network ?? ""} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
