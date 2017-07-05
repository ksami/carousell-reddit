/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */

import * as path from "path";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as swagger from "swagger2";
import {ui as swaggerUi, validate} from "swagger2-koa";
import Topic from "./Topic";

let app = new Koa();
let router = new Router();

let store: Topic[] = [new Topic("test post pls ignore", "username")];

// validate document
const document = swagger.loadDocumentSync(path.join(__dirname, "..", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
}

// router base path is /api/v1
router.prefix("/api/v1");
router.get("/ping", ctx => {
    ctx.body = {success: true, message: "hello world"};
});
router.get("/topics", ctx => {
    ctx.body = store.sort((a: Topic, b: Topic) => b.votes - a.votes).slice(0, 20);
});
router.post("/topics", ctx => {
    let newTopic = new Topic(ctx.request.body.text, ctx.request.body.username);
    store.push(newTopic);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});

app.use(bodyParser());
app.use(validate(document));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(swaggerUi(document, "/docs"));

app.listen(3000);
