import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 5173,
    },
    define: {
        global: "globalThis",
    },
    plugins: [
        react(),
        NodeGlobalsPolyfillPlugin({
            buffer: true,
        }),
        nodePolyfills(),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            buffer: "buffer", // Polyfill Buffer
        },
    },

}));
