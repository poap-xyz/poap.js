import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packages = ['moments', 'registry', 'drops'];

const configs = packages.map((pkg) => ({
  input: `packages/${pkg}/src/index.ts`,
  output: [
    {
      file: `packages/${pkg}/dist/cjs/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `packages/${pkg}/dist/esm/index.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically externalize dependencies
    typescript({
      tsconfig: `packages/${pkg}/tsconfig.json`,
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
  // external: ['@your-sdk-name/common'],
}));

export default configs;
