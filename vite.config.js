import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/vue-template/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
})