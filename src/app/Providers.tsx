"use client";

import { Toaster } from "@/components/ui/sonner";
import WalletContextProvider from "@/components/WalletProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WalletContextProvider>
            {children}
            <Toaster />
        </WalletContextProvider>
    );
}
