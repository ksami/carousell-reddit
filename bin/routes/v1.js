"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const models_1 = require("../models");
const utils_1 = require("../utils");
let router = new Router();
let store = new utils_1.Store(models_1.Topic.comparator, { isAscending: false });
// Base path for routes below
router.prefix("/v1");
// Routes
router.get("/ping", ctx => {
    ctx.body = { success: true, message: "hello world" };
});
router.get("/topics", ctx => {
    ctx.body = store.getSlice(0, 20);
});
router.post("/topics", ctx => {
    let newTopic = new models_1.Topic(ctx.request.body.text, ctx.request.body.username);
    store.insert(newTopic);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});
exports.default = router;
