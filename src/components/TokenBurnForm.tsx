"use client";
import burnTokens from "@/lib/burnTokens";
import { DOC_URL } from "@/lib/config";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { AlertCircle, ArrowRight, Flame, Info } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const TokenBurnForm: React.FC = () => {
    const { setVisible } = useWalletModal();
    const { publicKey, sendTransaction, connected } = useWallet();
    const [mintAddress, setMintAddress] = useState("");
    const [burnAmount, setBurnAmount] = useState("");
    const [tokenDecimals, setTokenDecimals] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState<
        null | "success" | "error"
    >(null);
    const { connection } = useConnection();
    const [tx, setTx] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!connected) {
            setVisible(true);
            return;
        }
        if (!mintAddress || !burnAmount || !tokenDecimals) {
            toast.error("Please fill in all fields");
            return;
        }

        // Validate mint address format (simplified check)
        if (mintAddress.length !== 44) {
            toast.error("Invalid mint address format");
            return;
        }

        // Validate burn amount is a number
        if (isNaN(parseFloat(burnAmount)) || parseFloat(burnAmount) <= 0) {
            toast.error("Burn amount must be a positive number");
            return;
        }

        // Validate token decimals is an integer
        if (
            isNaN(parseInt(tokenDecimals)) ||
            parseInt(tokenDecimals) < 0 ||
            parseInt(tokenDecimals) > 18
        ) {
            toast.error("Token decimals must be a number between 0 and 18");
            return;
        }

        setIsSubmitting(true);

        try {
            const Amount = parseFloat(burnAmount);
            const Decimals = parseInt(tokenDecimals);
            const signature = await burnTokens({
                mintAddress,
                burnAmount: Amount,
                tokenDecimals: Decimals,
                owner: publicKey!.toBase58(),
                sendTransaction,
            });
            setTx(signature);

            setTransactionStatus("success");
            toast.success("Tokens burned successfully!");

            setTimeout(() => {
                setMintAddress("");
                setBurnAmount("");
                setTokenDecimals("");
                setTransactionStatus(null);
            }, 3000);
        } catch (error) {
            setTransactionStatus("error");
            toast.error("Transaction failed. Please try again.");
            if (error && typeof error === "object" && "message" in error) {
                console.log(
                    "Burn transaction error:",
                    (error as { message: string }).message
                );
            } else {
                console.log("Burn transaction error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="glass-card p-6 md:p-8 max-w-md w-full mx-auto animate-scale-in">
            <div className="flex items-center justify-center mb-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                    <div className="relative bg-muted rounded-full p-3">
                        <Flame size={28} className="text-primary" />
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-semibold text-center mb-6 text-glow">
                Burn Tokens
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label
                        htmlFor="mintAddress"
                        className="text-sm text-foreground/80 flex items-center gap-1"
                    >
                        Token Mint Address
                        <Info size={14} className="text-foreground/60" />
                    </label>
                    <input
                        id="mintAddress"
                        type="text"
                        value={mintAddress}
                        onChange={(e) => setMintAddress(e.target.value)}
                        placeholder="Token mint address (e.g., EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)"
                        className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border input-highlight"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="grid md:grid-cols-2  gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="burnAmount"
                            className="text-sm text-foreground/80 flex items-center gap-1"
                        >
                            Burn Amount
                            <Info size={14} className="text-foreground/60" />
                        </label>
                        <input
                            id="burnAmount"
                            type="text"
                            value={burnAmount}
                            onChange={(e) => setBurnAmount(e.target.value)}
                            placeholder="Amount to burn"
                            className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border input-highlight"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tokenDecimals"
                            className="text-sm text-foreground/80 flex items-center gap-1"
                        >
                            Token Decimals
                            <Info size={14} className="text-foreground/60" />
                        </label>
                        <input
                            id="tokenDecimals"
                            type="number"
                            min="0"
                            max="18"
                            value={tokenDecimals}
                            onChange={(e) => setTokenDecimals(e.target.value)}
                            placeholder="e.g., 9"
                            className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border input-highlight"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 button-transition overflow-hidden ${
                            isSubmitting
                                ? "bg-muted text-foreground/60 cursor-not-allowed"
                                : "bg-primary text-white hover:bg-primary/90"
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin h-5 w-5 border-2 border-foreground/20 border-t-foreground/80 rounded-full"></div>
                                Processing...
                            </>
                        ) : transactionStatus === "error" ? (
                            <>
                                <AlertCircle size={20} />
                                Retry
                            </>
                        ) : (
                            <>
                                <Flame size={20} />
                                Burn Tokens
                            </>
                        )}
                    </button>
                </div>
            </form>

            {tx && (
                <div className="mt-6 text-sm text-foreground/60 text-center">
                    <span>See Transaction:</span>

                    <Link
                        href={`https://solscan.io/tx/${tx}?cluster=${
                            connection.rpcEndpoint.includes("devnet")
                                ? "devnet"
                                : "mainnet"
                        }`}
                        className="font-mono ms-2 text-foreground/80 underline"
                        target="_blank"
                    >
                        Here
                    </Link>
                </div>
            )}

            <div className="mt-6 border-t border-border pt-4">
                <div className="flex flex-wrap items-center justify-center gap-1 text-sm text-foreground/60">
                    <ArrowRight size={14} />
                    <span>Learn more about</span>
                    <Link
                        href={DOC_URL}
                        target="_blank"
                        className="text-primary hover:underline"
                    >
                        token burning
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TokenBurnForm;
