"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const models_1 = require("../models");
let router = new Router();
// Base path for routes below
router.prefix("/v1");
// Routes
router.get("/topics", async (ctx) => {
    ctx.body = await ctx.store.getSlice(0, 20);
});
router.post("/topics/create", async (ctx) => {
    const newTopic = new models_1.Topic(ctx.request.body.text, ctx.request.body.username);
    await ctx.store.insertItem(newTopic);
    ctx.body = await ctx.store.getSlice(0, 20);
});
router.put("/topics/:id/vote", async (ctx) => {
    const id = ctx.params.id;
    const action = ctx.request.body.action;
    try {
        await ctx.store.updateItemById(id, action);
        ctx.body = await ctx.store.getSlice(0, 20);
    }
    catch (e) {
        throw new Error("ID not found");
    }
});
exports.default = router;
