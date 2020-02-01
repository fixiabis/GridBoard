import typescript from 'rollup-plugin-typescript2';

let defaults = { compilerOptions: { declaration: true } };
let override = { compilerOptions: { declaration: false } };

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
  {
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigDefaults: override,
      })
    ],

    output: {
      file: 'dist/gridboard.js',
      format: 'umd',
      name: 'gridboard',
      indent: true
    }
  }
];
