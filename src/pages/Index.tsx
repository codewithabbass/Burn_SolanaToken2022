import React from "react";
import ParticleBackground from "../components/ParticleBackground";
import TokenBurnForm from "../components/TokenBurnForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flame, Zap, Shield } from "lucide-react";

const Index: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ParticleBackground />
            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12 animate-fade-in">
                        <div className="inline-block mb-4">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                                Solana Token Burn
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-glow">
                            Burn Tokens
                            <span className="text-primary">2022</span> With{" "}
                            <span className="text-primary">Precision</span>
                        </h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                            A seamless, secure way to permanently remove tokens
                            from circulation on the Solana blockchain.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
                        <div
                            className="order-2 lg:order-1 flex flex-col gap-4 justify-between h-full max-w-md lg:max-w-xl w-full mx-auto animate-scale-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            {/* <div className="space-y-6"> */}
                            <div className="flex flex-col sm:flex-row gap-4 glass-card p-6 animate-scale-in">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                                        <div className="relative bg-primary/10 rounded-full p-3">
                                            <Flame
                                                size={24}
                                                className="text-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-start font-semibold mb-1">
                                        Permanent Removal
                                    </h3>
                                    <p className="text-foreground/70 sm:text-start">
                                        Tokens sent to the burn address are
                                        permanently removed from circulation,
                                        reducing total supply.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 glass-card p-6 animate-scale-in">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                                        <div className="relative bg-primary/10 rounded-full p-3">
                                            <Zap
                                                size={24}
                                                className="text-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1 sm:text-start">
                                        Fast & Efficient
                                    </h3>
                                    <p className="text-foreground/70 sm:text-start">
                                        Leverage Solana's high performance to
                                        complete burn transactions in seconds
                                        with minimal fees.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 glass-card p-6 animate-scale-in">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                                        <div className="relative bg-primary/10 rounded-full p-3">
                                            <Shield
                                                size={24}
                                                className="text-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1 sm:text-start">
                                        Secure Operations
                                    </h3>
                                    <p className="text-foreground/70 sm:text-start">
                                        All transactions are executed with
                                        industry-standard security practices and
                                        verifiable on-chain.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="order-1 lg:order-2 perspective animate-fade-in"
                            style={{ animationDelay: "0.4s" }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-xl opacity-70"></div>
                                <TokenBurnForm />
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-24 text-center animate-fade-in"
                        style={{ animationDelay: "0.6s" }}
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                            Trusted by Leading{" "}
                            <span className="text-primary">Projects</span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {["Solana Labs", "Solscan", "Metaplex"].map(
                                (name, index) => (
                                    <div
                                        key={index}
                                        className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <span className="text-lg font-semibold">
                                            {name}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Index;
