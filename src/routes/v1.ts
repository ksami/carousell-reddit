import * as Router from "koa-router";
import {Topic} from "../models";
import {ACTION} from "../libs";

let router = new Router();


// Base path for routes below
router.prefix("/v1");

// Routes
router.get("/ping", ctx => {
    ctx.body = {success: true, message: "hello world"};
});

router.get("/topics", ctx => {
    ctx.body = ctx.store.getSlice(0, 20);
});

router.post("/topics/create", ctx => {
    const newTopic = new Topic(ctx.request.body.text, ctx.request.body.username);
    ctx.store.insertItem(newTopic);
    ctx.body = ctx.store.getSlice(0, 20);
});

router.post("/topics/:id/vote", ctx => {
    const id = ctx.params.id;
    const action = ctx.request.body.action;

    let topic = ctx.store.updateItemById(id, action);

    if(topic) {
        ctx.body = ctx.store.getSlice(0, 20);
    } else {
        throw new Error("ID not found");
    }
});


export default router;
