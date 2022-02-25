// rollup.config.js
import typescript from "@rollup/plugin-typescript";

// css

import postcss from "rollup-plugin-postcss";

export default {
    input: "src/proton.ts",
    output: {
        dir: "dist",
    },
    plugins: [
        typescript({
            sourceMap: true,
        }),
        postcss({
            extensions: [".css"],
            plugins: [
                require("cssnano")({
                    preset: [
                        "default",
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                }),
            ],
        }),
    ],
};