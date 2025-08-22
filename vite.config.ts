import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import dts from 'vite-plugin-dts';
import typescript from '@rollup/plugin-typescript';

// Read package.json to get build targets
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: pkg.name.replace('@', '').replace('/', '-'), // Convert scoped name to valid UMD name
      formats: ['cjs', 'es', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'cjs':
            return 'cjs/index.cjs';
          case 'es':
            return 'esm/index.mjs';
          case 'umd':
            return 'umd/index.js';
          default:
            return `${format}/index.js`;
        }
      },
    },
    rollupOptions: {
      // External dependencies that should not be bundled
      external: [/^lodash\..*/, 'uuid'],
      output: {
        globals: {
          'lodash.chunk': '_',
          'uuid': 'uuid',
        },
        exports: 'named',
        interop: 'auto',
      },
      plugins: [
        typescript({
          tsconfig: resolve(__dirname, 'tsconfig.json'),
          outputToFilesystem: false,
        }),
      ],
    },
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      outDir: 'dist/types',
      insertTypesEntry: false, // Don't insert types entry since package.json already handles it
      rollupTypes: true, // Bundle all types into single files
    }),
  ],
});