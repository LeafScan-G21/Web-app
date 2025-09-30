import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  server: {
    proxy: {
      // Use '/proxy' as the trigger for the proxy
      '/proxy': {
        target: 'https://llm.plantvillage.psu.edu:8080',
        changeOrigin: true,
        // Rewrite the path by removing '/proxy' from the start
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },
})