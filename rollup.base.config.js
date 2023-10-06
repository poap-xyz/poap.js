import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import path from 'path';

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
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      typescript({
        tsconfig: `./tsconfig.json`,
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
    ],
    plugins: [
      typescript({
        tsconfig: `./tsconfig.json`,
      }),
      nodeResolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
    ],
  },
];

export default configs;
