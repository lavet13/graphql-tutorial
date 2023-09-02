import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import codegen from 'vite-plugin-graphql-codegen';

export default defineConfig({
  server: {
    port: 4001,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
    }),
    codegen({ matchOnSchemas: true, debug: true }),
  ],
});
