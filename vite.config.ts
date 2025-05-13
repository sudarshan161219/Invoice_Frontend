// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import fs from "fs";

// const localIP = "192.168.31.224";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: localIP, 
//     port: 5173,
//     https: {
//       key: fs.readFileSync("./192.168.31.224-key.pem"),
//       cert: fs.readFileSync("./192.168.31.224.pem"),
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
