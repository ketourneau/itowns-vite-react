import * as fs from "fs";
import { resolve } from "path";
import { PluginOption } from "vite";

interface WorkerInfo {
    originalName: string,
    bundledPath: string,
    relativeUrl: string
}

const WORKERS: WorkerInfo[] = [{
    originalName: "LASLoaderWorker.js",
    bundledPath: resolve(import.meta.dirname, "node_modules/itowns/dist/itowns_lasworker.js"),
    relativeUrl: "workers/itowns_lasworker.js"
}, {
    originalName: "Potree2Worker.js",
    bundledPath: resolve(import.meta.dirname, "node_modules/itowns/dist/itowns_potree2worker.js"),
    relativeUrl: "workers/itowns_potree2worker.js"
}];

// itowns ships its workers as pre-built webpack bundles in dist/.
// The source files (lib/Worker/*.js) use `threads/worker` which Vite
// cannot bundle correctly. Two complementary strategies are used:
//
// DEV (resolveId + configureServer):
//   Vite's worker handling runs before the transform hook, so we must
//   intercept at the HTTP level and in module resolution.
//   - resolveId redirects LASLoaderWorker.js / Potree2Worker.js to the
//     pre-built dist files so Vite's module graph is correct.
//   - configureServer middleware intercepts the HTTP request (including
//     the ?worker_file&type=module variant added by Vite) and streams
//     the pre-built bundle directly.
//
// PROD (transform + generateBundle):
//   Rolldown calls transform before bundling. We rewrite the
//   `new Worker(new URL(..., import.meta.url))` expression in the itowns
//   parser files to a plain string URL so Rolldown never tries to re-bundle
//   the webpack artefact. generateBundle then emits the pre-built files
//   verbatim as static assets in dist/workers/.
const itownsWorkerPrebuild = (): PluginOption => ({
    name: "itowns-worker-prebuild",
    enforce: "pre",

    // ── DEV: redirect module resolution to the pre-built file ──────────
    resolveId(id) {
        const cleanId = id.split("?")[0];

        const workerInfo = WORKERS.find(worker => cleanId.endsWith(worker.originalName));
        if (!workerInfo) {
            return undefined;
        }
        return workerInfo.bundledPath;
    },

    // ── PROD: rewrite worker instantiation before Rolldown bundles it ───
    transform(code, id) {
        const parserRegex = new RegExp("itowns/lib/Parser/(LASParser|Potree2BinParser)\.js$");
        if (!parserRegex.test(id)) {
            return undefined;
        }
        const workerRegex = /new Worker\(\/\*[^*]*\*\/\s*new URL\(['"]\.\.\/Worker\/([^"]+)['"],\s*import\.meta\.url\),\s*[{]\s*type:\s*['"]module['"]\s*[}]\)/;
        const matches = code.match(workerRegex);
        if (!matches || matches.length <= 1) {
            return undefined;
        }
        const workerFilename = matches[1];
        const workerInfo = WORKERS.find(worker => worker.originalName === workerFilename);
        if (!workerInfo) {
            return undefined;
        }
        return code.replace(workerRegex, `new Worker("./${ workerInfo.relativeUrl }", {type: "module"})`);
    },

    // ── PROD: emit pre-built workers verbatim as static assets ─────────
    generateBundle(this) {
        for (const workerInfo of WORKERS) {
            this.emitFile({
                type: "asset",
                fileName: workerInfo.relativeUrl,
                source: fs.readFileSync(workerInfo.bundledPath)
            });
        }
    },

    // ── DEV: intercept HTTP requests for worker files ──────────────────
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            // Matches bare name and Vite's ?worker_file&type=module variant
            const workerInfo = WORKERS.find(worker => req.url?.includes(worker.originalName));
            if (!workerInfo) {
                next();
                return;
            }
            res.setHeader("Content-Type", "application/javascript");
            fs.createReadStream(workerInfo.bundledPath).pipe(res);
        });
    }
});

export default itownsWorkerPrebuild;
