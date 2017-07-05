"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const models_1 = require("../models");
const utils_1 = require("../utils");
let router = new Router();
let store = new utils_1.Store([new models_1.Topic("test post pls ignore", "username")]);
// Base path for routes below
router.prefix("/v1");
// Routes
router.get("/ping", ctx => {
    ctx.body = { success: true, message: "hello world" };
});
router.get("/topics", ctx => {
    ctx.body = store.getTopItems(20);
});
router.post("/topics", ctx => {
    let newTopic = new models_1.Topic(ctx.request.body.text, ctx.request.body.username);
    store.insert(newTopic, models_1.Topic.comparator, true);
    ctx.body = Object.assign({
        success: true,
        message: "Topic successfully created"
    }, newTopic);
});
exports.default = router;
