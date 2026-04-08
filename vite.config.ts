import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import itownsWorkersPlugin from "./itownsWorkers.plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        itownsWorkersPlugin()
    ]
});
