
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: "src/browser.ts",
        plugins: [
            commonjs(),
            resolve(),
            typescript(),
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
            })
        ],
        output: {
            dir: 'dist',
            name: 'jque',
            format: 'es',
            sourcemap: true,
        },
    },
];