import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'src/assets/Onboarding1.png',
        'src/assets/Onboarding2.png',
        'src/assets/monitor-icon.svg'
      ],
      manifest: {
        name: 'VocalAid',
        short_name: 'VocalAid',
        description: 'Assistive voice/typing for real-time calls',
        theme_color: '#111827',
        background_color: '#0b1220',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/src/assets/Onboarding1.png', sizes: '192x192', type: 'image/png' },
          { src: '/src/assets/Onboarding2.png', sizes: '512x512', type: 'image/png' },
          { src: '/src/assets/monitor-icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your Python backend URL
        changeOrigin: true,
      },
    },
  },
})
