import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const NGROK_HOST = '642e59a6e084.ngrok-free.app' // <-- your ngrok subdomain

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,            // listen on all interfaces
    port: 5173,
    allowedHosts: [NGROK_HOST],            // or use a regex: [/\.ngrok-free\.app$/]
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
    },
    // HMR over ngrok (so the dev websocket works through https)
    hmr: {
      host: NGROK_HOST,
      protocol: 'wss',
      clientPort: 443,
    },
    // optional but helps absolute URLs in logs/HMR
    // origin: `https://${NGROK_HOST}`,
  },
})
