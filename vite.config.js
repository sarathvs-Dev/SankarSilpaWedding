import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Local stand-in for Vercel Functions: `npm run dev` serves /api/gallery from
 * api/gallery.js, reading GOOGLE_DRIVE_* from .env.local. Dev server only;
 * on Vercel the api/ folder is deployed as real serverless functions.
 */
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use('/api/gallery', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/gallery.js')
        handler(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devApi()],
})
