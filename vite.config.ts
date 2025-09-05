import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { reactRouter } from "@react-router/dev/vite"

export default defineConfig({
    plugins: [
        tailwindcss(), reactRouter(), tsconfigPaths(),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'app',
            filename: 'sw.ts',
            registerType: 'autoUpdate',
            injectRegister: 'auto',

            manifest: {
                name: 'project-management',
                short_name: 'project-management',
                description: 'project-management',
                theme_color: '#ffffff',

                icons: [{
                    src: 'logo.png',
                    sizes: '64x64',
                    type: 'image/png',
                }, {
                    src: 'logo.png',
                    sizes: '192x192',
                    type: 'image/png',
                }, {
                    src: 'logo.png',
                    sizes: '512x512',
                    type: 'image/png',
                }, {
                    src: 'logo.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                }],
            },

            injectManifest: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        })
    ],
})
