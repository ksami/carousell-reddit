"use strict";
/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const swagger = require("swagger2");
const swagger2_koa_1 = require("swagger2-koa");
const Topic_1 = require("./Topic");
let app = new Koa();
let router = new Router();
let store = [new Topic_1.default("test post pls ignore", "username")];
// validate document
const document = swagger.loadDocumentSync(path.join(__dirname, "..", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
}
// router base path is /api/v1
router.prefix("/api/v1");
router.get("/ping", ctx => {
    ctx.body = { success: true, message: "hello world" };
});
router.get("/topics", ctx => {
    ctx.body = store.sort((a, b) => b.votes - a.votes).slice(0, 20);
});
router.post("/topics", ctx => {
    let newTopic = new Topic_1.default(ctx.request.body.text, ctx.request.body.username);
    store.push(newTopic);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});
app.use(bodyParser());
app.use(swagger2_koa_1.validate(document));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(swagger2_koa_1.ui(document, "/docs")); // mount api docs to /docs
app.listen(3000);
