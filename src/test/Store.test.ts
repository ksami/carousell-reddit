import {assert} from "chai";
import {Identifier, Votable, ACTION} from "../libs";
import {Store} from "../utils";

import {Topic} from "./mocks";

export default function() {
    let store: Store<Topic>;
    let serialNumber: number;
    beforeEach(function() {
        store = new Store(Topic.comparator);
        serialNumber = 0;
    });

    describe("Create", function() {
        it("should create a store with no items", async function() {
            let result = await store.getSlice();
            assert.lengthOf(result, 0);
        });
    });

    describe("insertItem", function() {
        it("should insert element at index 0 for empty store", async function() {
            await store.insertItem(new Topic("1", 1));
            let result = await store.getSlice();
            assert.sameDeepOrderedMembers(result, [new Topic("1", 1)]);
        });
        it("should insert and sort in descending order", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new Topic((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice();
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(Topic.comparator).map(s => s.val));
        });
    });

    describe("updateItemById", function() {
        it("should return undefined for id not found", async function() {
            try {
                let result = await store.updateItemById("not-found", "upvote");
                // should not reach
                assert.isNotOk(result);
            } catch(e) {
                assert.isUndefined(e);
            }
        });
        it("should update and sort in descending order", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new Topic((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            await store.updateItemById("3", "downvote");
            let result = await store.getSlice();
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(Topic.comparator).map(s => s.val));
        });
    });

    describe("getSlice", function() {
        it("should return empty array if store is empty", async function() {
            let result = await store.getSlice();
            assert.isArray(result);
            assert.lengthOf(result, 0);
        });
        it("should return slice of items from start (including) to end (excluding)", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new Topic((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice(0, 20);
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(Topic.comparator).slice(0, 20).map(s => s.val));
        });
    });
}