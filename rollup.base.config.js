import fs from 'fs';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const pkg = require(path.resolve(process.cwd(), 'package.json'));

const srcDir = 'src';
const subpackages = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const input = Object.fromEntries(
  subpackages.map((sub) => [sub, `./src/${sub}/index.ts`]),
);
input['index'] = './src/index.ts';

const configs = [
  {
    input,
    output: [
      {
        dir: pkg.main.replace(/index.*/, ''),
        format: 'cjs',
        exports: 'named',
        entryFileNames: '[name]/index.cjs',
      },
      {
        dir: pkg.module.replace(/index.*/, ''),
        format: 'esm',
        exports: 'named',
        entryFileNames: '[name]/index.mjs',
      },
    ],
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
