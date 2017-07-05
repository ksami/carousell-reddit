import * as Router from "koa-router";
import {Topic} from "../models";
import {Store} from "../utils";

let router = new Router();
let store = new Store([new Topic("test post pls ignore", "username")]);


// Base path for routes below
router.prefix("/v1");

// Routes
router.get("/ping", ctx => {
    ctx.body = {success: true, message: "hello world"};
});

router.get("/topics", ctx => {
    ctx.body = store.getTopItems(20);
});

router.post("/topics", ctx => {
    let newTopic = new Topic(ctx.request.body.text, ctx.request.body.username);
    store.insert(newTopic, Topic.comparator, true);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});


export default router;
