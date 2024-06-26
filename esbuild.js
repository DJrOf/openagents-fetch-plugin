const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['src/index.js'],
        outdir: 'dist',
        bundle: true,
        sourcemap: true,
        minify: false,
        format: 'cjs', 
        target: ['es2020']
})