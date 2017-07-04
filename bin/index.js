"use strict";
/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
app.use(ctx => ctx.body = "Hello World");
app.listen(3000);
