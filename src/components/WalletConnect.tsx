"use client";
import { truncateString } from "@/utils/truncateString";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React, { useCallback } from "react";
import { Button } from "./ui/button";
const WalletConnect: React.FC = () => {
    const { connected, wallet, disconnect, publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const handleConnect = useCallback(() => {
        if (!connected) {
            setVisible(true);
        }
    }, [setVisible, connected]);

    const handleDisconnect = useCallback(() => {
        if (wallet) {
            disconnect();
        }
    }, [wallet, disconnect]);

    return (
        <div>
            {connected ? (
                <Button
                    onClick={() => handleDisconnect()}
                    size={"lg"}
                    className="glass-card px-4 py-2 text-primary hover:text-white hover:bg-primary/80 transition-colors duration-200"
                >
                    {publicKey?.toString()
                        ? truncateString({ str: publicKey?.toString() }) // Ensure truncateString is synchronous and returns a string
                        : ""}
                </Button>
            ) : (
                <Button
                    onClick={() => handleConnect()}
                    className="glass-card px-4 py-2 text-primary hover:text-white hover:bg-primary/80 transition-colors duration-200"
                    size={"lg"}
                >
                    Connect Wallet
                </Button>
            )}
        </div>
    );
};

export default WalletConnect;
