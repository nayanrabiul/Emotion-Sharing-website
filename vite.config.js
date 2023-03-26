import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blog_frontend_jukto_interview_2023/',
  plugins: [react()],
});
