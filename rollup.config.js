import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

let defaults = { compilerOptions: { declaration: true } };
let hideDeclaration = { compilerOptions: { declaration: false } };

export default [
  {
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigDefaults: defaults,
      })
    ],

    output: {
      file: 'lib/index.js',
      format: 'cjs',
      indent: true
    }
  },
  /*{
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigDefaults: hideDeclaration,
      })
    ],

    output: {
      file: 'dist/gridboard.js',
      format: 'umd',
      name: 'gridboard',
      indent: true
    }
  },
  {
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigDefaults: hideDeclaration,
      }),
      uglify()
    ],

    output: {
      file: 'dist/gridboard.min.js',
      format: 'umd',
      name: 'gridboard',
      indent: true
    }
  }*/
];
