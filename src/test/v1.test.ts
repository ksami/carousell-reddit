import {assert} from "chai";
import * as sinon from "sinon";
import {getTopics, createTopic, voteTopic} from "../routes/v1";

import {Topic} from "../models";
import {Store} from "../utils";

export default function() {
    var ctx: any;
    beforeEach(function() {
        ctx = {
            request: {body: {text: "", username: "", action: ""}},
            params: {id: ""},
            store: new Store(Topic.comparator)
        };
        sinon.spy(ctx.store, "getSlice");
        sinon.spy(ctx.store, "insertItem");
        sinon.spy(ctx.store, "updateItemById");
    });

    afterEach(function() {
        ctx.store.getSlice.restore();
        ctx.store.insertItem.restore();
        ctx.store.updateItemById.restore();
    });

    describe("getTopics", function() {
        it("should return top 20 items in body", async function() {
            await getTopics(ctx);
            sinon.assert.calledWith(ctx.store.getSlice, 0, 20);
            assert.isArray(ctx.body);
        });
    });

    describe("createTopic", function() {
        it("should insert topic then return top 20 items in body", async function() {
            await createTopic(ctx);
            sinon.assert.calledWith(ctx.store.insertItem, sinon.match.instanceOf(Topic));
            sinon.assert.calledWith(ctx.store.getSlice, 0, 20);
            assert.isArray(ctx.body);
        });
    });
    
    describe("voteTopic", function() {
        it("should update topic then return top 20 items in body", async function() {
            let topic = new Topic();
            await ctx.store.insertItem(topic);
            ctx.params.id = topic.id;
            ctx.request.body.action = "upvote";

            await voteTopic(ctx);
            sinon.assert.calledWith(ctx.store.updateItemById, topic.id, "upvote");
            sinon.assert.calledWith(ctx.store.getSlice, 0, 20);
            assert.isArray(ctx.body);
        });
        it("should throw ID not found", async function() {
            try {
                ctx.params.id = "not-found";
                ctx.request.body.action = "downvote";
                await voteTopic(ctx);
            } catch(e) {
                sinon.assert.calledWith(ctx.store.updateItemById, "not-found", "downvote");
                assert.instanceOf(e, Error);
                assert.equal(e.message, "ID not found");
            }
        });
    });
}