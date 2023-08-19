import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import codegen from 'vite-plugin-graphql-codegen';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: {} }), codegen()],
});
