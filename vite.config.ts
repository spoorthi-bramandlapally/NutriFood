import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third argument '' ensures we load ALL env vars, not just VITE_ ones.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Check all common naming conventions for the API Key
  const apiKey = env.API_KEY || 
                 env.VITE_API_KEY || 
                 env.GOOGLE_API_KEY || 
                 env.GEMINI_API_KEY || 
                 process.env.API_KEY || 
                 process.env.VITE_API_KEY || 
                 '';

  return {
    plugins: [react()],
    define: {
      // 1. Shim process.env.API_KEY specifically with the found key
      'process.env.API_KEY': JSON.stringify(apiKey),
      // 2. Shim process.env object to prevent "process is not defined" crashes in libraries
      'process.env': JSON.stringify({}),
    }
  }
})