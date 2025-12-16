import {
    createBurnInstruction,
    getAssociatedTokenAddress,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { connection } from "./config";

interface BurnInterface {
    mintAddress: string;
    burnAmount: number;
    tokenDecimals: number;
    owner: string;
    sendTransaction: (
        transaction: Transaction,
        connection: Connection
    ) => Promise<string>;
}
const burnTokens = async ({
    mintAddress,
    burnAmount,
    tokenDecimals,
    owner,
    sendTransaction,
}: BurnInterface): Promise<string> => {
    try {
        const mint = new PublicKey(mintAddress);
        const authority = new PublicKey(owner);
        const tokenAccount = await getAssociatedTokenAddress(
            mint,
            authority,
            false,
            TOKEN_2022_PROGRAM_ID
        );

        const amount = burnAmount * 10 ** tokenDecimals;

        const burnInstruction = createBurnInstruction(
            tokenAccount, // Token account holding the tokens
            mint, // Mint address of the token
            authority, // Authority (wallet that owns the tokens)
            amount, // Adjust for token decimals (e.g., 9 decimals)
            [],
            TOKEN_2022_PROGRAM_ID
        );

        // Create transaction to burn tokens
        const transaction = new Transaction().add(burnInstruction);

        // Send transaction using connected wallet
        const signature = await sendTransaction(transaction, connection);
        console.log("Burn Transaction Signature:", signature);
        return signature;
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error Occurred While Burning Tokens:", error.message);
            throw new Error(`Error burning tokens: ${error.message}`);
        } else {
            console.log("Error Occurred While Burning Tokens:", error);
            throw new Error(`Error burning tokens: ${String(error)}`);
        }
    }
};

export default burnTokens;
