import Koa from 'koa';
import serve from "koa-static";
import Router from '@koa/router';
import chalk from 'chalk';
import { rollup } from 'rollup';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const WORK_DIR = process.cwd();
const DEMO_DIR = resolve(WORK_DIR, 'demo');
const ROLLUP_CONF_PATH = resolve(WORK_DIR, 'rollup.config.ts');
const SERVE_PORT = 44444;

const app = new Koa();
const router = new Router();

router.get('/jque.js', async (ctx, next) => {
    const rollupConfig = await import(pathToFileURL(ROLLUP_CONF_PATH).toString());
    // console.log(rollupConfig);
    const browserConfig = rollupConfig.default[0];
    const bundle = await rollup(browserConfig);
    // console.log(bundle.watchFiles);
    const output = await bundle.generate(browserConfig);
    // console.log(output);
    ctx.body = output.output[0].code;
    await next();
});

app.use(serve(DEMO_DIR));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(SERVE_PORT);
console.log('serve: ', chalk.blue(DEMO_DIR), 'on port:', chalk.cyan(SERVE_PORT));
