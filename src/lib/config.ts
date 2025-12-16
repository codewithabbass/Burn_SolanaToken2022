import { Connection } from "@solana/web3.js";

const MODE = process.env.NEXT_PUBLIC_MODE || 'development';
const MAINNET_RPC = process.env.NEXT_PUBLIC_RPC_MAINNET || 'https://api.mainnet-beta.solana.com';
const DEVNET_RPC = process.env.NEXT_PUBLIC_RPC_DEVNET || 'https://api.devnet.solana.com';

const connection =
    MODE === "production"
        ? new Connection(MAINNET_RPC)
        : new Connection(DEVNET_RPC);

const DOC_URL = "https://solana.com/ru/docs/tokens/basics/burn-tokens"

export { connection, MODE, DOC_URL };