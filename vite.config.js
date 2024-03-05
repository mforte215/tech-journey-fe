import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://tech-journey-apollo-2137197654ec.herokuapp.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
