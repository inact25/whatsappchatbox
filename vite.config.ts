import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import path from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
    plugins: [],
    resolve: {
        alias: [
            {
                find: "~",
                replacement: path.resolve(__dirname, "./src"),
            },
        ],
    },
    server: {
        port: 3000,
    },
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.tsx"),
            fileName: "main",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [],
            plugins: [
                // @ts-ignore
                typescriptPaths({
                    preserveExtensions: true,
                }),
                // @ts-ignore
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: "dist",
                }),
            ],
        },
    },
});
