"use client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ParticleBackground />
            <Navbar />

            <main className="grow flex items-center justify-center px-6 py-24">
                <div className="glass-card p-8 md:p-12 max-w-md w-full text-center animate-scale-in">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-destructive/30 rounded-full blur-xl"></div>
                            <div className="relative bg-muted rounded-full p-3">
                                <AlertCircle
                                    size={28}
                                    className="text-destructive"
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold mb-4 text-glow">404</h1>
                    <p className="text-xl text-foreground/80 mb-8">
                        Oops! The page you're looking for doesn't exist.
                    </p>

                    <Link
                        href="/"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                        Return to Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
