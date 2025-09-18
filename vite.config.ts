import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/campus-safe-buddy/',   // <-- IMPORTANT for GitHub Pages
})
