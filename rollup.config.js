import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import svg from 'rollup-plugin-svg'
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/index.tsx", // Entry point is now a TypeScript file
    output: {
        file: "dist/bundle.js",
        format: "umd",
        name: "cds-tailwind-pro",
        sourcemap: true, // Optional: Enable source maps
    },
    plugins: [
        resolve(), // Resolves node modules
        commonjs(), // Converts CommonJS modules to ES6
        typescript({tsconfig: "./tsconfig.json"}), // Compiles TypeScript
        babel({
            babelHelpers: "bundled",
            extensions: [".ts", ".tsx"],
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
        }),
        svg(),
        postcss({
            plugins: [],
            minimize: true,
            extract: true,
            extensions: [".css"],
        }),
    ],
};
