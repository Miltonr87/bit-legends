import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
export default defineConfig({
    server: {
        host: "::",
        port: 8080,
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@data": path.resolve(__dirname, "./src/data"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@styles": path.resolve(__dirname, "./src/styles"),
        },
        dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
        include: ["react", "react-dom", "@tanstack/react-query"],
    },
    appType: "spa",
});
