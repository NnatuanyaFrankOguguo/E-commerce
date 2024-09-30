import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'; // Add this
import nodeResolve from '@rollup/plugin-node-resolve'; // Add this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs(), // Include the CommonJS plugin
    nodeResolve()], // Include the Node Resolve plugin],
  
})
