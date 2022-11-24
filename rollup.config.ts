
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: "src/browser.ts",
        plugins: [typescript()],
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