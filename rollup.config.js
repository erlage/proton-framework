// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/proton.ts",
    output: {
        dir: "dist",
    },
    plugins: [typescript()],
};