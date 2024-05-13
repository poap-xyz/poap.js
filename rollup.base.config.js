import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
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
      sourcemap: true,
    },
    cache: false,
    plugins: [
      typescript({
        tsconfig: `./tsconfig.json`,
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      json(),
    ],
  },
  {
    input: `./src/index.ts`,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: pkg.main.replace('.js', '.d.cts'),
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
      {
        file: pkg.module.replace('.js', '.d.mts'),
        format: 'esm',
        sourcemap: false,
        exports: 'named',
      },
    ],
    external: ['axios'],
    plugins: [
      typescript({
        tsconfig: `./tsconfig.json`,
      }),
      nodeResolve({
        preferBuiltins: true,
        browser: false,
      }),
      commonjs(),
      nodePolyfills(),
      json(),
    ],
  },
];

export default configs;
