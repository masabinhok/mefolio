import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 css: {
  postcss: {
    plugins: [tailwindcss],  // autoprefixer is already included with Tailwind
  },
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})