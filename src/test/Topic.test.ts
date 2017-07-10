import {assert} from "chai";
import {Identifier, Votable, ACTION} from "../libs";
import {Topic} from "../models";

export default function() {
    describe("Create", function() {
        it("should create an empty topic", function() {
            let result = new Topic();
            assert.isString(result.id);
            assert.isNumber(result.createdAt);
            assert.propertyVal(result, "text", "");
            assert.propertyVal(result, "upvotes", 0);
            assert.propertyVal(result, "downvotes", 0);
            assert.propertyVal(result, "votes", 0);
            assert.propertyVal(result, "author", "");
        });
        it("should create a topic with text and author", function() {
            let result = new Topic("To be or not to be", "William Shakespeare");
            assert.isString(result.id);
            assert.isNumber(result.createdAt);
            assert.propertyVal(result, "text", "To be or not to be");
            assert.propertyVal(result, "upvotes", 0);
            assert.propertyVal(result, "downvotes", 0);
            assert.propertyVal(result, "votes", 0);
            assert.propertyVal(result, "author", "William Shakespeare");
        });
    });

    describe("update", function() {
        it("should increase vote count on upvote", function() {
            let result = new Topic();
            result.update("upvote");
            assert.propertyVal(result, "upvotes", 1);
            assert.propertyVal(result, "downvotes", 0);
            assert.propertyVal(result, "votes", 1);
        });
        it("should decrease vote count on downvote", function() {
            let result = new Topic();
            result.update("downvote");
            assert.propertyVal(result, "upvotes", 0);
            assert.propertyVal(result, "downvotes", 1);
            assert.propertyVal(result, "votes", -1);
        });
        it("should keep count of up and downvotes", function() {
            let randomVotes = Array(100).fill(0).map(() => Math.floor(Math.random() * 2)).map(n => n ? "upvote": "downvote");
            let up = randomVotes.filter(v => v === "upvote").length;
            let down = randomVotes.filter(v => v === "downvote").length;
            let result = new Topic();
            randomVotes.forEach(v => result.update(v));
            assert.propertyVal(result, "upvotes", up);
            assert.propertyVal(result, "downvotes", down);
            assert.propertyVal(result, "votes", up - down);
        });
    });
}