
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
    {
        input: "src/browser.ts",
        plugins: [
            commonjs(),
            resolve(),
            typescript({
                sourceMap: true,
            }),
            terser(),
        ],
        output: {
            name: 'jque',
            file: 'jque.min.js',
            format: 'iife',
            sourcemap: true,
            globals: {
                jque: '$v',
            },
        },
    },
    {
        input: "src/jque/all.ts",
        plugins: [
            commonjs(),
            resolve(),
            typescript({
                sourceMap: true,
                compilerOptions: {
                    outDir: 'dist',
                    // out: 'dist/all.d.ts',
                    declaration: true,
                    // declarationMap: true,
                    // declarationDir: 'dist',
                },
                exclude: [
                    "src/browser.ts",
                ],
            }),
            terser(),
        ],
        output: {
            dir: 'dist',
            name: 'jque',
            format: 'es',
            sourcemap: true,
        },
    },
];