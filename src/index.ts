/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */

import * as Koa from "koa";

const app = new Koa();

app.use(ctx => ctx.body = "Hello World");

app.listen(3000);