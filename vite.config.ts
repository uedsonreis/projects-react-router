import { VitePWA } from 'vite-plugin-pwa'

import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { config } from 'dotenv'

config()

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),
    VitePWA({
        strategies: 'injectManifest',
        srcDir: 'app',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        manifest: {
            name: 'Todo List',
            short_name: 'Projetos',
            description: 'Gerencie seus projetos e tarefas de forma eficiente com o Todo List.',
            theme_color: '#0e0b3a',
            background_color: '#510e15',
            display: 'standalone',

            icons: [{
                src: 'logo.png',
                sizes: '144x144',
                type: 'image/png',
            }],
        },

        injectManifest: {
            globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        },

        devOptions: {
            enabled: true,
            navigateFallback: 'index.html',
            suppressWarnings: true,
            type: 'module',
        },
    })],
})
