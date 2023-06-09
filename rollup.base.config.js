import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
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
      peerDepsExternal(), // Automatically externalize dependencies
      nodeResolve({ browser: true }),
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
      peerDepsExternal(), // Automatically externalize dependencies
      typescript({
        tsconfig: `./tsconfig.json`,
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      commonjs(),
      json(),
    ],
  },
];

export default configs;
