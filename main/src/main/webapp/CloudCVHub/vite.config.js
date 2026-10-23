import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: process.env.VERCEL ? 'dist' : path.resolve(__dirname, '../../resources/static'),
    emptyOutDir: false,
    // =========================================================================
    // [TỐI ƯU HIỆU NĂNG 03 - VENDOR CHUNKS SPLITTING]
    // Tách các thư viện node_modules cốt lõi thành vendor chunk riêng biệt
    // =========================================================================
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
