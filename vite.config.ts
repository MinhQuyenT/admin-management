import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@components": fileURLToPath(
                new URL("./src/components", import.meta.url)
            ),
            "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
            "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
            "@apis": fileURLToPath(new URL("./src/apis", import.meta.url)),
        },
    },
})
