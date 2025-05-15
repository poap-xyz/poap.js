import fs from 'node:fs';
import path from 'node:path';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// This is possible because of `--bundleConfigAsCjs`
const pkg = require(path.resolve(process.cwd(), 'package.json'));

// Enable the compilation in to UMD for the browser.
const enableBrowser = pkg.browser != undefined;

// Some packages enable the submodules to be included individually, these would
// only be available in the CommonJS and ES6 Modules settings.
const enableSubmodules = pkg.config?.build?.enableSubmodules === true;

/**
 * Creates an `index` with the initial `index.ts` and one for each sub-folder
 * in the given source directory.
 */
function createInputWithSubmodulesFromSource(srcDir) {
  const folders = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const input = Object.fromEntries(
    folders.map((folder) => [folder, `./${srcDir}/${folder}/index.ts`]),
  );
  input['index'] = `./${srcDir}/index.ts`;

  return input;
}

const external = ['next-seo', /lodash\..*/, 'uuid'];

/**
 * @type {import('rollup').RollupOptions[]}
 */
const configs = [
  {
    input: enableSubmodules
      ? createInputWithSubmodulesFromSource('src')
      : './src/index.ts',
    output: [
      {
        dir: pkg.main.replace(/index.*/, ''),
        format: 'cjs',
        exports: 'named',
        entryFileNames: '[name]/index.cjs',
        chunkFileNames: 'index/[name].cjs',
        interop: 'auto',
      },
      {
        dir: pkg.module.replace(/index.*/, ''),
        format: 'esm',
        exports: 'named',
        entryFileNames: '[name]/index.mjs',
        chunkFileNames: 'index/[name].cjs',
        interop: 'auto',
      },
    ],
    plugins: [
      commonjs({
        strictRequires: 'auto',
      }),
      nodeResolve({
        preferBuiltins: true,
        browser: false,
      }),
      typescript({
        tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      }),
      terser({ sourceMap: true }),
    ],
    external,
  },
];

if (enableBrowser && !enableSubmodules) {
  configs.push({
    context: 'window',
    input: enableSubmodules
      ? createInputWithSubmodulesFromSource('src')
      : './src/index.ts',
    output: {
      name: pkg.name,
      dir: pkg.browser.replace(/index.*/, ''),
      format: 'umd',
      exports: 'named',
      entryFileNames: '[name]/index.js',
      chunkFileNames: 'index/[name].js',
    },
    cache: false,
    plugins: [
      commonjs({
        strictRequires: 'auto',
      }),
      nodeResolve({
        browser: true,
      }),
      nodePolyfills(),
      typescript({
        tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      }),
      terser({ sourceMap: true }),
    ],
    external,
  });
}

export default configs;
