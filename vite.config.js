import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  base: '/horse-racing/',
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/theme.scss" as *;`
      }
    }
  }
})
