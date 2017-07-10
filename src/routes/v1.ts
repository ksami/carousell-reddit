import {Context} from "koa";
import * as Router from "koa-router";
import {Topic} from "../models";
import {ACTION} from "../libs";


let router = new Router();

// Base path for routes below
router.prefix("/v1");

// Routes
router.get("/topics", getTopics);
router.post("/topics/create", createTopic);
router.put("/topics/:id/vote", voteTopic);


export default router;


// Controllers
export async function getTopics(ctx: Context) {
    ctx.body = await ctx.store.getSlice(0, 20);
}

export async function createTopic(ctx: Context) {
    const newTopic = new Topic(ctx.request.body.text, ctx.request.body.username);
    await ctx.store.insertItem(newTopic);
    ctx.body = await ctx.store.getSlice(0, 20);
}

export async function voteTopic(ctx: Context) {
    const id = ctx.params.id;
    const action = ctx.request.body.action;

    try {
        await ctx.store.updateItemById(id, action);
        ctx.body = await ctx.store.getSlice(0, 20);
    } catch(e) {
        throw new Error("ID not found");
    }
}
