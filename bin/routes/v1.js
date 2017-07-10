"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const models_1 = require("../models");
let router = new Router();
// Base path for routes below
router.prefix("/v1");
// Routes
router.get("/topics", getTopics);
router.post("/topics/create", createTopic);
router.put("/topics/:id/vote", voteTopic);
exports.default = router;
// Controllers
async function getTopics(ctx) {
    ctx.body = await ctx.store.getSlice(0, 20);
}
exports.getTopics = getTopics;
async function createTopic(ctx) {
    const newTopic = new models_1.Topic(ctx.request.body.text, ctx.request.body.username);
    await ctx.store.insertItem(newTopic);
    ctx.body = await ctx.store.getSlice(0, 20);
}
exports.createTopic = createTopic;
async function voteTopic(ctx) {
    const id = ctx.params.id;
    const action = ctx.request.body.action;
    try {
        await ctx.store.updateItemById(id, action);
        ctx.body = await ctx.store.getSlice(0, 20);
    }
    catch (e) {
        throw new Error("ID not found");
    }
}
exports.voteTopic = voteTopic;
