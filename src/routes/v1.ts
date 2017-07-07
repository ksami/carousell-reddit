import * as Router from "koa-router";
import {Topic} from "../models";

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

router.post("/topics", ctx => {
    const newTopic = new Topic(ctx.request.body.text, ctx.request.body.username);
    ctx.store.insert(newTopic);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});

router.post("/topics/:id", ctx => {
    const id = ctx.params.id;
    const action = ctx.request.body.action;
    let topic = ctx.store.getById(id);

    if(action === "upvote") {
        topic.upvote();
    } else if(action === "downvote") {
        topic.downvote();
    } else {
        throw new Error("body.action not upvote or downvote");
    }

    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully updated"
    }, topic);
});


export default router;
