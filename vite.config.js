import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://tech-journey-apollo-2137197654ec.herokuapp.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
