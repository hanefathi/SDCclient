import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': resolve(__dirname, './src/pages'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@redux': resolve(__dirname, './src/redux'),
      '@assets': resolve(__dirname, './src/assets'),
      '@context': resolve(__dirname, './src/context'),
      '@services': resolve(__dirname, './src/services'),
      '@components': resolve(__dirname, './src/components'),
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true, // This helps in environments where file changes are not detected
      interval: 100, // Adjust the polling interval if necessary
    },
  }
})
