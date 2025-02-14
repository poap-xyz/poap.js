import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import path from 'path';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const pkg = require(path.resolve(process.cwd(), 'package.json'));

const configs = [
  {
    context: 'window',
    input: './src/index.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
    },
    cache: false,
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      json(),
      terser({ sourceMap: true }),
    ],
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
      },
    ],
    external: ['axios'],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve({
        preferBuiltins: true,
        browser: false,
      }),
      commonjs(),
      nodePolyfills(),
      json(),
      terser({ sourceMap: true }),
    ],
  },
];

export default configs;
