"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const models_1 = require("../models");
let router = new Router();
// Base path for routes below
router.prefix("/v1");
// Routes
router.get("/ping", ctx => {
    ctx.body = { success: true, message: "hello world" };
});
router.get("/topics", ctx => {
    ctx.body = ctx.store.getSlice(0, 20);
});
router.post("/topics/create", ctx => {
    const newTopic = new models_1.Topic(ctx.request.body.text, ctx.request.body.username);
    ctx.store.insertItem(newTopic);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});
router.post("/topics/:id", ctx => {
    const id = ctx.params.id;
    const action = ctx.request.body.action;
    let topic = ctx.store.updateItemById(id, action);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully updated"
    }, topic);
});
exports.default = router;
