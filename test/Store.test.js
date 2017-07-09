const {assert} = require("chai");
const {Store} = require("../bin/utils");

module.exports = function() {
    let store;
    beforeEach(function() {
        store = new Store((a, b) => a - b, true);
    });

    afterEach(function() {
        store = null;
    });

    describe("Create", function() {
        it("should create a store with no items", function() {
            assert.equal(store._store.length, 0);
        });
    });

    describe("insertItem", function() {
        it("should insert element at index 0 for empty store", async function() {
            await store.insertItem(1);
            assert.sameOrderedMembers(store._store, [1]);
        });
        it("should insert and sort in ascending order", async function() {
            await store.insertItem(4);
            await store.insertItem(1);
            await store.insertItem(2);
            assert.sameOrderedMembers(store._store, [1, 2, 4]);
        });
    });

    describe("getSlice", function() {
        it("should return empty array if store is empty", async function() {
            let result = await store.getSlice();
            assert.isArray(result);
            assert.lengthOf(result, 0);
        });
        it("should return slice of items from start (including) to end (excluding)", async function() {
            await store.insertItem(1);
            await store.insertItem(2);
            await store.insertItem(3);
            let result = await store.getSlice(0, 3);
            assert.sameOrderedMembers(result, [1,2,3]);
        });
    });
}