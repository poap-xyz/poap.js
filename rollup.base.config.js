import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const configs = {
  input: `./src/index.ts`,
  output: [
    {
      file: `./dist/cjs/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `./dist/esm/index.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically externalize dependencies
    typescript({
      tsconfig: `./tsconfig.json`,
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
};

export default configs;
