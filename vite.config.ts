import { svelte as sveltePlugin } from "@sveltejs/vite-plugin-svelte";
import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";
import * as Vite from "vite";
import checker from "vite-plugin-checker";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";


const config = Vite.defineConfig(({ command, mode }): Vite.UserConfig => {
    const buildMode = mode === "production" ? "production" : "development";
    const outDir = "dist";

    const { foundryPort, serverPort } =
        command === "serve"
            ? (() => {
                // Load foundry config if available to potentially use a different port.
                const FOUNDRY_CONFIG = fs.existsSync("./foundryconfig.json")
                    ? JSON.parse(fs.readFileSync("./foundryconfig.json", { encoding: "utf-8" }))
                    : null;
                const foundryPort = Number(FOUNDRY_CONFIG?.foundryPort) || 30000;
                const serverPort = Number(FOUNDRY_CONFIG?.port) || 30001;
                console.log(`Connecting to foundry hosted at http://localhost:${foundryPort}/`);
                return { foundryPort, serverPort };
            })()
            : { foundryPort: 30000, serverPort: 30001 };
    
    const plugins = [checker({ typescript: true}), tsconfigPaths({ loose: true }), sveltePlugin()];

    if (buildMode === "production") {
        plugins.push(
            {
                name: "minify",
                renderChunk: {
                    order: "post",
                    async handler(code, chunk) {
                        return chunk.fileName.endsWith(".mjs")
                            ? esbuild.transform(code, {
                                keepNames: true,
                                minifyIdentifiers: false,
                                minifySyntax: true,
                                minifyWhitespace: true,
                            })
                            : code;
                    },
                },
            },
            ...viteStaticCopy({
                targets: [],
            }),
        );
    } else {
        plugins.push(
            {
                name: "touch-vendor-mjs",
                apply: "build",
                writeBundle: {
                    async handler() {
                        fs.closeSync(fs.openSync(path.resolve(outDir, "vendor.mjs"), "w"));
                    },
                },
            },

            {
                name: "hmr-handler",
                apply: "serve",
                handleHotUpdate(context) {
                    if (context.file.startsWith(outDir)) return;

                    if (context.file.includes("/lang/") && context.file.endsWith("json")) {
                        const basePath = context.file.slice(context.file.indexOf("lang/"));
                        console.log(`Updating lang file at ${basePath}`);
                        fs.promises.copyFile(context.file, `${outDir}/${basePath}}`).then(() => {
                            context.server.ws.send({
                                type: "custom",
                                event: "lang-update",
                                data: { path: `systems/fvttnineshadows/${basePath}` },
                            });
                        });
                    } else if (context.file.endsWith(".hbs")) {
                        const basePath = context.file.slice(context.file.indexOf("templates/"));
                        console.log(`Updating template file at ${basePath}`);
                        fs.promises.copyFile(context.file, `${outDir}/${basePath}}`).then(() => {
                            context.server.ws.send({
                                type: "custom",
                                event: "template-update",
                                data: { path: `systems/fvttnineshadows/${basePath}` },
                            });
                        });
                    }
                },
            },
        );
    }

    return {
        base: command === "build" ? "./" : "/systems/fvttnineshadows",
        publicDir: "static",
        define: {
            BUILD_MODE: JSON.stringify(buildMode)
        },
        server: {
            port: serverPort,
            open: "/game",
            proxy: {
                "^(?!/systems/fvttnineshadows/)": `http://localhost:${foundryPort}`,
                "/socket.io": {
                    target: `ws://localhost:${foundryPort}`,
                    ws: true,
                },
            },
        },
        plugins,
        css: { devSourcemap: buildMode === "development" },
    };
});

export default config;
